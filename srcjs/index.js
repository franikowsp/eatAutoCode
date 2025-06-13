import { codeResponses, codeResponsesArray } from "./modules/codeResponses";
import { getVariableDependencyTree } from "./modules/getVariableDependencyTree";
import { extractVariableLocation } from "./modules/extractVariableLocation";

Object.assign(global, {
  codeResponses: codeResponses,
  codeResponsesArray: codeResponsesArray,
  getVariableDependencyTree: getVariableDependencyTree,
  extractVariableLocation: extractVariableLocation,
});
