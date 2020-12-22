import { Schema } from "jsonschema";

export interface Variable {
  name: string;
  value: any;
  schema: Schema;
}
export interface Preset {
  name: string;
  uuid: string;
  variables: Array<VariablePreset>;
}

export interface VariablePreset {
  deviceUuid: string;
  variableUuid: string;
  value: object;
}
