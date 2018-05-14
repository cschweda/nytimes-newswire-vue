"use strict";
const merge = require("webpack-merge");
const prodEnv = require("./prod.env");
let env;

try {
  env = require("./env.js");
} catch (e) {
  if (e.code !== "MODULE_NOT_FOUND") {
    throw e;
  }
  env = { apiKey: "NOT_DEFINED_DEVELOPMENT" };
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_KEY: JSON.stringify(process.env.API_KEY || env.key)
});
