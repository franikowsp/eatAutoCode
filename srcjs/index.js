import { codeResponses, codeResponsesArray } from "./modules/codeResponses";
import { getVariableDependencyTree } from "./modules/getVariableDependencyTree";
import { extractUnitDefinition } from "./modules/extractUnitDefinition";

Object.assign(global, {
  codeResponses: codeResponses,
  codeResponsesArray: codeResponsesArray,
  getVariableDependencyTree: getVariableDependencyTree,
  extractUnitDefinition: extractUnitDefinition,
});
