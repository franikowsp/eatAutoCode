import { CodingScheme, ResponseStatusType } from "@iqb/responses";
import deparseJSON from "../helpers/deparseJSON";

type UnitResponses = {
  id: string;
  status: ResponseStatusType;
  value: any;
};

type UnitsArray = {
  responses: UnitResponses[];
};

export function codeResponses(params: {
  codingScheme: any;
  responses: UnitResponses[] | string;
}): UnitResponses[] {
  const { codingScheme, responses } = params;

  // Parse responses and variableCodings if it's a JSON string
  const { variableCodings }: { variableCodings: any } =
    deparseJSON(codingScheme);
  const preparedScheme = new CodingScheme(variableCodings);

  const responsesToCode: UnitResponses[] = deparseJSON(responses);

  // Create CodingScheme instance and code responses
  const coded = preparedScheme.code(responsesToCode);

  return coded;
}

export function codeResponsesArray(params: {
  codingScheme: any;
  responses: UnitsArray[] | string;
}): UnitsArray[] {
  const { codingScheme, responses } = params;

  // Parse responses and variableCodings if it's a JSON string
  const { variableCodings }: { variableCodings: any } =
    deparseJSON(codingScheme);
  const preparedScheme = new CodingScheme(variableCodings);

  const responsesToCode: UnitsArray[] = deparseJSON(responses);

  const coded = responsesToCode.map((resp) => {
    const responses: UnitResponses[] = deparseJSON(resp.responses);
    resp.responses = preparedScheme.code(responses);

    return resp;
  });

  return coded;
  //   return JSON.stringify(coded);
}
