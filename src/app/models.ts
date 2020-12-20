import { Schema } from "jsonschema";

export interface Variable {
  name: string;
  value: any;
  schema: Schema;
}
export interface Preset {
  name: string;
  deviceUuid: string;
  deviceName: string;
  variables: Array<VariablePreset>;
}

export interface VariablePreset {
  uuid: string;
  value: object;
}
