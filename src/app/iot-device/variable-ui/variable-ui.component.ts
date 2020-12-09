import { VariableNumberComponent } from "./variable-number/variable-number.component";
import { VariableStringComponent } from "./variable-string/variable-string.component";
import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from "@angular/core";
import { IotService } from "src/app/iot.service";
import { Variable } from "src/app/models";
import { Controller } from "@wiklosoft/ng-iot";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  selector: "app-variable-ui",
  templateUrl: "./variable-ui.component.html",
  styleUrls: ["./variable-ui.component.scss"],
})
export class VariableUiComponent implements OnInit {
  @ViewChild("container", { read: ViewContainerRef }) container;

  @Input() deviceUuid: string;
  @Input() variableUuid: string;
  @Input() variable: Variable;

  propertiesUi = [];
  controller: Controller;

  constructor(private iot: IotService, private resolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) {
    this.controller = iot.getController();
  }

  ngOnInit(): void {
    this.controller.observe(this.deviceUuid, this.variableUuid).subscribe((newValue: any) => {
      this.variable.value = newValue;

      this.propertiesUi.map((component) => {
        component.instance.ngOnUpdate();
      });
    });
  }

  ngAfterViewInit() {
    this.generatePropertiesUi();
  }

  generatePropertiesUi() {
    this.container.clear();
    this.generateUiForProp(this.variable.schema.properties, []);
    this.cdr.detectChanges();
  }

  generateUiForProp(properties, parent) {
    for (let propertyName of Object.keys(properties)) {
      const type = properties[propertyName].type;

      switch (type) {
        case "object":
          this.generateUiForProp(properties[propertyName].properties, [...parent, propertyName]);
          break;
        case "string":
          this.createComponent(VariableStringComponent, propertyName, properties[propertyName], [
            ...parent,
            propertyName,
          ]);
          break;
        case "number":
        case "integer":
          this.createComponent(VariableNumberComponent, propertyName, properties[propertyName], [
            ...parent,
            propertyName,
          ]);
          break;
      }
    }
  }

  createComponent(component, propertyName, property, parents) {
    const factory = this.resolver.resolveComponentFactory(component);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.name = propertyName;
    componentRef.instance.parents = parents;
    componentRef.instance.property = property;
    componentRef.instance.variable = this.variable;
    componentRef.instance.valueChange.subscribe((newValue) => {
      this.onValueChange(newValue);
    });
    this.propertiesUi.push(componentRef);
  }

  async onValueChange(value) {
    const newValue = { ...this.variable.value, ...value };
    try {
      const res = await this.controller.setValue(this.deviceUuid, this.variableUuid, JSON.stringify(newValue));
    } catch (e) {
      console.error("Unable to set value to", newValue);
    }
  }
}
