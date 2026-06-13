const path = require('path');
module.paths.push(path.resolve(__dirname, '../backend/node_modules'));
require('dotenv').config({ path: path.resolve(__dirname, '../backend/.env') });

const { Cashfree } = require("cashfree-pg");
const cashfree = new Cashfree();

console.log("Instance properties:", Object.getOwnPropertyNames(cashfree));
console.log("Prototype properties:", Object.getOwnPropertyNames(Object.getPrototypeOf(cashfree)));

// Find all properties matching Order or Payment
const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(cashfree));
console.log("\nMatching methods:");
methods.forEach(m => {
  if (m.toLowerCase().includes("order") || m.toLowerCase().includes("payment") || m.toLowerCase().includes("get")) {
    console.log(" -", m);
  }
});
