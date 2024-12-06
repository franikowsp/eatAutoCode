import { codeResponses, codeResponsesArray } from "./modules/codeResponses";
import { getVariableDependencyTree } from "./modules/getVariableDependencyTree";

Object.assign(global, {
  codeResponses: codeResponses,
  codeResponsesArray: codeResponsesArray,
  getVariableDependencyTree: getVariableDependencyTree,
});
