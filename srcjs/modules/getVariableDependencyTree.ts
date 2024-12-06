import { CodingScheme } from "@iqb/responses";
import deparseJSON from "../helpers/deparseJSON";

export const getVariableDependencyTree = function (params: {
  codingScheme: any;
}): any {
  const { codingScheme } = params;

  const { variableCodings }: { variableCodings: any } =
    deparseJSON(codingScheme);

  const preparedScheme = new CodingScheme(variableCodings);
  return preparedScheme.getVariableDependencyTree();
};
