const config = require("./jest.config.common");
config.testMatch = ["**/tests/e2e/**/*.spec.[jt]s?(x)"];
module.exports = config;
