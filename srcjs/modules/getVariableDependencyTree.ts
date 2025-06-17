import { CodingSchemeFactory } from "@iqb/responses";
// import deparseJSON from "../helpers/deparseJSON";

export const getVariableDependencyTree = function (params: {
  codingScheme: any;
}): any {
  const { codingScheme } = params;

  return CodingSchemeFactory.getVariableDependencyTree(
    codingScheme.variableCodings
  );
};
