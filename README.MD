# coo-table

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> A flexible Table for your REST-Service. Customize it to your needs as everything can be changed via Templates.

[Visit our Demo Page](https://s3.eu-central-1.amazonaws.com/coodoo-baf-resources/coo-table/demo/src/index.html)

## Table of Contents

- [Install](#install)
- [NPM Scripts](#npm-scripts)
- [Develop](#develop)
- [Setup](#Setup)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Install

```
npm install coo-dialog
```

## NPM Scripts

There are severall npm scripts so you extend this dialog for your needs

```
npm run start:app -> is starting the Demo Application inside the demo folder with the content of the module under src
npm run test -> is starting the karma instance to run the tests under the src folder
npm run test:watch -> is starting the tests and run them on every change in the src and demo folder
npm run test:coverage -> just prints a common test coverage report
npm run start:app -> start the demo application out of the root folder
npm run build:ngs -> build the coo-dialog with ngc to the dist folder
npm run build:demo -> builds the demo under the demo/dist folder
npm run ts-lint -> lint the code against the given lint config
npm run compodoc -> creates the documentation for this ng modul with the help of compodoc
```

## Develop

If you wanna develop on this module it is helpful to link the /src into the /demo/src/app/modules/ folder and import all the needed sources against this folder

```
ln -s [Path to your working space]/src/ demo/src/app/modules/table
```
With this little trick it is possible to compile the demo with the given build script

## Setup

Import the CooTable Module to your Project
```
@NgModule({
    declarations : [ AppComponent, MainComponent ],
    imports : [
        BrowserModule, FormsModule, HttpModule, CooTableModule,
        RouterModule.forRoot([ { path : '', pathMatch : 'full', component : AppComponent }, { redirectTo : '', path : 'foo' } ], { useHash : true })
    ],
    providers : [ WineService ],
    bootstrap : [ MainComponent ]
})
```

Update your angluar-cli.json with tje styles form the installed bootstrap version or your own

```
"styles": [
                "./src/styles.css",
                "./../node_modules/bootstrap/dist/css/bootstrap.css",
                "./../node_modules/ionicons/dist/css/ionicons.min.css"
            ],
```

## Usage

### Example 

![alt text](https://s3.eu-central-1.amazonaws.com/coodoo-baf-resources/coo-table/Bildschirmfoto+2017-05-22+um+15.23.02.png "Logo Title Text 1")

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

### Current coverage

```
=============================== Coverage summary ===============================
Statements   : 78.33% ( 347/443 )
Branches     : 49.48% ( 48/97 )
Functions    : 62.63% ( 62/99 )
Lines        : 76.34% ( 300/393 )
================================================================================
```

## License

MIT © coodoo
