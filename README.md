# Angular4 with TypeScript and Gulp

[![Paypal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://goo.gl/mgesnb)
[![Gratipay Team](https://img.shields.io/badge/give-a%20cup%20of%20coffee-b35900.svg)](https://gratipay.com/Angular-VN)

[![Build Status](https://travis-ci.org/AngularVN/angular4-seed.svg?branch=master)](https://travis-ci.org/AngularVN/angular4-seed)
[![Code Climate](https://codeclimate.com/github/AngularVN/angular4-seed/badges/gpa.svg)](https://codeclimate.com/github/AngularVN/angular4-seed)
[![Coverage Status](https://coveralls.io/repos/github/AngularVN/angular4-seed/badge.svg)](https://coveralls.io/github/AngularVN/angular4-seed)
[![dependencies Status](https://david-dm.org/AngularVN/angular4-seed/status.svg)](https://david-dm.org/AngularVN/angular4-seed)
[![devDependencies Status](https://david-dm.org/AngularVN/angular4-seed/dev-status.svg)](https://david-dm.org/AngularVN/angular4-seed?type=dev)

#### A basic Angular4 application with Gulp as build system.

Demo
----
http://angularvn.github.io/angular4-seed/


Prerequisites
-------------

- nodejs >= 4
- npm >= 3

Running
-------

### Install dependencies:

> npm install

`node_modules` and `typings` directories should be created during the install.


Set the Environment to enable Debug
-------

#### Linux/Mac

> export NG2ENV=Dev


#### Windows CMD

> set NG2ENV=Dev


#### Windows Powershell

> $env:NG2ENV = 'Dev'


### Build and Run with Liveload

```bash
npm run clean
npm run build
npm run serve
```

`build` directory should be created during the build
The application should be displayed in the browser.


### Build and start the project:

```bash
npm run clean
npm run build
npm start
```
## Docker   

[Docker Hub](https://hub.docker.com/r/angularvn/angular4-seed/)       

### Run from Docker Hub
```bash
docker pull angularvn/angular4-seed
docker run --rm --name angularvn -p 3000:3000  angularvn/angular4-seed
```

## Deploy on Cloud 9
(https://ide.c9.io/leduong/angular4-seed)

```bash
nvm install 6
nvm alias default 6
npm i
npm run build
npm run serve
```

```
angular4-seed
├── bs-config.js
├── _config.yml
├── gulpfile.js
├── package.json
├── README.md
├── src
│   ├── app
│   │   ├── about
│   │   │   └── components
│   │   │       ├── about.html
│   │   │       └── about.ts
│   │   ├── app.component.ts
│   │   ├── app.html
│   │   ├── app.module.ts
│   │   ├── app.routing.ts
│   │   ├── blog
│   │   │   ├── routing.ts
│   │   │   └── service.ts
│   │   ├── common
│   │   │   └── error
│   │   │       ├── error403.html
│   │   │       ├── error403.ts
│   │   │       ├── error404.html
│   │   │       ├── error404.ts
│   │   │       ├── error500.html
│   │   │       └── error500.ts
│   │   ├── layout
│   │   │   ├── header
│   │   │   │   ├── header.html
│   │   │   │   ├── header.less
│   │   │   │   └── header.ts
│   │   │   ├── layout.module.ts
│   │   │   └── sidebar
│   │   │       ├── sidebar.html
│   │   │       ├── sidebar.less
│   │   │       └── sidebar.ts
│   │   ├── main.ts
│   │   ├── setting
│   │   │   ├── routing,ts
│   │   │   └── service.ts
│   │   ├── shared
│   │   │   ├── components
│   │   │   ├── directives
│   │   │   │   └── gravatar.ts
│   │   │   ├── pipes
│   │   │   │   ├── capitalize.ts
│   │   │   │   ├── characters.ts
│   │   │   │   └── trim.ts
│   │   │   ├── services
│   │   │   │   ├── local.ts
│   │   │   │   └── session.ts
│   │   │   └── shared.module.ts
│   │   ├── tables
│   │   │   ├── dynamic.html
│   │   │   ├── dynamic.ts
│   │   │   ├── responsive.html
│   │   │   ├── responsive.ts
│   │   │   ├── static.html
│   │   │   └── static.ts
│   │   ├── translate
│   │   │   ├── lang-en.ts
│   │   │   ├── lang-es.ts
│   │   │   ├── lang-zh.ts
│   │   │   ├── pipe.ts
│   │   │   ├── service.ts
│   │   │   └── translations.ts
│   │   ├── ui
│   │   │   ├── buttons.html
│   │   │   ├── buttons.ts
│   │   │   ├── components.html
│   │   │   ├── components.ts
│   │   │   ├── grids.html
│   │   │   ├── grids.ts
│   │   │   ├── icons.html
│   │   │   ├── icons.ts
│   │   │   ├── typography.html
│   │   │   └── typography.ts
│   │   └── user
│   │       ├── login
│   │       │   ├── component.ts
│   │       │   ├── login.html
│   │       │   └── login.less
│   │       ├── pipes.ts
│   │       ├── profile
│   │       │   ├── component.ts
│   │       │   ├── profile.html
│   │       │   └── profile.less
│   │       ├── register
│   │       │   ├── component.ts
│   │       │   ├── register.html
│   │       │   └── register.less
│   │       ├── routing.ts
│   │       ├── services.ts
│   │       └── user.less
│   ├── img
│   │   └── g1.jpg
│   ├── index.html
│   └── less
│       ├── app.less
│       ├── body.less
│       ├── buttons.less
│       ├── custom.less
│       ├── footer.less
│       ├── layout.less
│       └── var.less
├── systemjs.config.js
├── tree.txt
├── tsconfig.json
├── tslint.json
└── typings.json

25 directories, 85 files
```

Thanks
