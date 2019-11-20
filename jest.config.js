const config = require("./jest.config.common");
config.moduleNameMapper = {
  "^~/(.*)$": "<rootDir>/src/app/$1",
  "^~common/(.*)$": "<rootDir>/src/common/$1",
  "^~electron/(.*)$": "<rootDir>/src/electron/$1"
};
module.exports = config;
