"use strict";
module.exports = {
  NODE_ENV: '"production"',
  API_KEY: JSON.stringify(process.env.API_KEY || "NOT_DEFINED_PRODUCTION")
};
