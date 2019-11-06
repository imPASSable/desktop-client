var config = require("./jest.config");
config.testMatch = ["**/tests/e2e/**/*.spec.[jt]s?(x)"];
module.exports = config;
