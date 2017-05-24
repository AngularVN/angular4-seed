System.config({
  defaultExtension: 'js',
  paths: {
    // paths serve as alias
    'npm:': 'node_modules/'
  },
  typescriptOptions: {
    "target": "es5",
    "module": "commonjs",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": false,
    "noImplicitAny": false
  },
  // map tells the System loader where to look for things
  map: {
    // our app is within the app folder
    app: '.tmp',
    // angular bundles
    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
    '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
    "@angular/core/src/facade/lang": "npm:@angular/core/src/facade/lang.js",
    // other libraries
    '@ngx-translate/core': 'npm:@ngx-translate/core/bundles/core.umd.js',
    '@ngx-translate/http-loader': 'npm:@ngx-translate/http-loader/bundles/http-loader.umd.js',
    'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',

    'rxjs': 'npm:rxjs',
    'moment': 'npm:moment/moment.js',
    'node-md5': 'npm:node-md5/index.js',
    'ngx-bootstrap': 'npm:ngx-bootstrap'
  },
  // packages tells the System loader how to load when no filename and/or no extension
  packages: {
    app: { main: './main.js', defaultExtension: 'js' },
    rxjs: { defaultExtension: 'js' },
    'ngx-bootstrap': { format: 'cjs', main: 'bundles/ngx-bootstrap.umd.js', defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: './index.js', defaultExtension: 'js' }
  }
});
