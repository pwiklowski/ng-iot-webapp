import { Permission } from "@wiklosoft/ng-iot";
import { Schema } from "jsonschema";

export interface Variable {
  name: string;
  value: any;
  access: Permission;
  schema: Schema;
}
