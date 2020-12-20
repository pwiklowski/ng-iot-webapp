import { Schema } from "jsonschema";

export interface Variable {
  name: string;
  value: any;
  schema: Schema;
}
export interface Setting {
  name: string;
  deviceUuid: string;
  deviceName: string;
  variables: Array<VariableSetting>;
}

export interface VariableSetting {
  uuid: string;
  value: object;
}
