import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

import { JSHINT } from "jshint";
window.JSHINT = JSHINT;

import "codemirror/mode/javascript/javascript";
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/lint/javascript-lint.js";

import "codemirror/addon/hint/javascript-hint.js";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
