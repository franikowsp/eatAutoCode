// bundle.js
import iqbResponses from "@iqb/responses";
import { CodingScheme } from "@iqb/responses";

// ggf. auslenden
global.iqbResponses = iqbResponses;

global.codeResponses = function ({
  codingScheme: { variableCodings },
  responses,
}) {
  const responses2Code =
    typeof responses !== "object" ? JSON.parse(responses) : responses;

  const preparedScheme = new CodingScheme(variableCodings);
  return preparedScheme.code(responses2Code);
};

global.getVariableDependencyTree = function ({
  codingScheme: { variableCodings },
}) {
  const preparedScheme = new CodingScheme(variableCodings);
  return preparedScheme.getVariableDependencyTree();
};

// console.log(global.codeResponses({ codingScheme: test, responses: testResp }));

// global.setVariableList = (varInfos) => new iqbResponses.VariableList(varInfos);
// global.setCodingScheme = ({ variableCodings }) =>
//   new iqbResponses.CodingScheme(variableCodings);

// console.log(new iqbResponses.CodingScheme([{ id: 1 }]).code);

// global.prepareScheme =
