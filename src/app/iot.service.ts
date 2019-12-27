import { Injectable } from "@angular/core";
import { MessageType, Controller, Request } from "@wiklosoft/ng-iot";
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

class VariableObserver {
  variableUuid: string;
  deviceUuid: string;
  observer: Subject<Object>;
}

export enum ConnectionState {
  CONNECTED,
  DISCONNECTED,
  NOT_AUTHORIZED
}

@Injectable({
  providedIn: "root"
})
export class IotService {
  controller: Controller;
  observables: Array<VariableObserver> = [];

  stateObserver: Subject<ConnectionState> = new BehaviorSubject(
    ConnectionState.DISCONNECTED
  );

  constructor() {
    this.controller = new Controller();

    this.controller.onOpen = () => {
      console.log("connected");
      this.controller.getDevices(devices => {
        console.log("devices", devices);
        this.stateObserver.next(ConnectionState.CONNECTED);
      });
    };

    this.controller.onClose = error => {
      console.log("disconnected", error.code);
      if (error.code === 4403) {
        this.stateObserver.next(ConnectionState.NOT_AUTHORIZED);
      } else {
        this.stateObserver.next(ConnectionState.DISCONNECTED);
      }
    };

    this.controller.onMessage = message => {
      console.log("handle message", message);
      switch (message.type) {
        case MessageType.DeviceConnected:
          {
            const deviceConfig = message.args.device;
            const observables = this.observables.filter(
              observable => observable.deviceUuid === deviceConfig.deviceUuid
            );

            if (observables.length > 0) {
              observables.map(observable => {
                observable.observer.next(
                  deviceConfig.vars[observable.variableUuid].value
                );
              });
            }
          }
          break;
        case MessageType.DeviceDisconnected:
          {
            const deviceUuid = message.args.id;
            const observables = this.observables.filter(
              observable => observable.deviceUuid === deviceUuid
            );

            if (observables.length > 0) {
              observables.map(observable => {
                observable.observer.next(undefined);
              });
            }
          }
          break;
        case MessageType.ValueUpdated:
          this.observables.forEach(observer => {
            if (
              observer.deviceUuid === message.args.deviceUuid &&
              observer.variableUuid === message.args.variableUuid
            ) {
              observer.observer.next(message.args.value);
            }
          });
          break;
      }
    };
  }

  connect(token: string): Observable<ConnectionState> {
    this.controller.connect(`${environment.iotServer}?token=${token}`, null);
    return this.stateObserver;
  }

  setValue(deviceUuid, variableUuid, value) {
    const request: Request = {
      type: MessageType.SetValue,
      reqId: 0,
      args: { deviceUuid, variableUuid, value }
    };

    console.log("setValue", deviceUuid, variableUuid, value);
    this.controller.sendRequest(request, response => {});
  }

  observe(deviceUuid: string, variableUuid: string) {
    const observable = new Subject();

    const observer: VariableObserver = {
      variableUuid,
      deviceUuid,
      observer: observable
    };
    this.controller.getDevice(deviceUuid).then((response: any) => {
      console.log("device config", response);

      if (response.deviceConfig) {
        observable.next(response.deviceConfig.vars[variableUuid].value);
      } else {
        observable.next(undefined);
      }
    });

    this.observables.push(observer);

    return observable;
  }

  unsubscribe(observable) {
    this.observables = this.observables.filter(
      (variableObserver: VariableObserver) => {
        return variableObserver.observer !== observable;
      }
    );
  }
}
