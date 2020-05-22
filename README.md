# openvasp-csharp-ui

UI for openvasp-csharp-host

# Prerequisites

Firstly install node modules by command:  
npm ci  
This command uses package-lock.json file with necessary versions.

## Development server

To run locally execute command `npm run serve-en`, the available commands are in package.json file inside scripts section.  
Navigate to `http://localhost:4200/en`. The app will automatically reload if you change any of the source files.  
Pay attention to file `nginx/env-config.json` which contains settings required for application including api url `ApiUrl`. This file is downloading at the moment of application start.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the production build. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
