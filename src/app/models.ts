import { Schema } from "jsonschema";

export interface Variable {
  name: string;
  value: any;
  schema: Schema;
}
