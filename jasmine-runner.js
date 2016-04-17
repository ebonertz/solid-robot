'use strict'

const Jasmine = require('jasmine');
const SpecReporter = require('jasmine-spec-reporter');
let noop = function () {
};

let jrunner = new Jasmine();
jrunner.configureDefaultReporter({
  displayStacktrace: "all"
});
jasmine.getEnv().addReporter(new SpecReporter());   // add jasmine-spec-reporter
jrunner.loadConfigFile();                           // load jasmine.json configuration
jrunner.execute();