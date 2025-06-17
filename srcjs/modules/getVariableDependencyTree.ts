import { CodingSchemeFactory } from "@iqb/responses";
import deparseJSON from "../helpers/deparseJSON";

export const getVariableDependencyTree = function (params: {
  codingScheme: any;
}): any {
  const { codingScheme } = params;

  const codingSchemeParsed = deparseJSON(codingScheme);

  return CodingSchemeFactory.getVariableDependencyTree(
    codingSchemeParsed.variableCodings
  );
};
