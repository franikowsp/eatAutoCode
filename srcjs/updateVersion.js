// // copy.js
const fs = require("fs");

const inputFile = "package.json";
const outputFile = "inst/packageVersion.json";

const dataTxt = fs.readFileSync(inputFile, "utf8");
const dataJson = JSON.parse(dataTxt);

fs.writeFileSync(outputFile, JSON.stringify(dataJson?.devDependencies));
