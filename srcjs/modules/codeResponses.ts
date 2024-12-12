import { CodingScheme, ResponseStatusType } from "@iqb/responses";
import insertManual from "../helpers/insertManual";
import deparseJSON from "../helpers/deparseJSON";

type UnitResponses = {
  id: string;
  status: ResponseStatusType;
  value: any;
};

type ManualCodes = {
  id: string;
  status: ResponseStatusType;
  code: number;
};

type UnitsArray = {
  responses: UnitResponses[];
  manual: ManualCodes[];
};

export function codeResponses(params: {
  codingScheme: any;
  responses: UnitResponses[] | string;
  manual: ManualCodes[] | string | null;
}): UnitResponses[] {
  const { codingScheme, responses, manual } = params;

  // Parse responses and variableCodings if it's a JSON string
  const { variableCodings }: { variableCodings: any } =
    deparseJSON(codingScheme);
  const preparedScheme = new CodingScheme(variableCodings);

  let responsesToCode: UnitResponses[] = deparseJSON(responses);
  const manualToInsert: ManualCodes[] | null = manual && deparseJSON(manual);

  if (manualToInsert !== null) {
    responsesToCode = insertManual({
      responses: responsesToCode,
      manual: manualToInsert,
    });
  }

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
    let responses: UnitResponses[] = deparseJSON(resp.responses);

    const manualToInsert: ManualCodes[] | null =
      resp?.manual && deparseJSON(resp.manual);

    if (manualToInsert !== null && manualToInsert !== undefined) {
      responses = insertManual({
        responses: responses,
        manual: manualToInsert,
      });

      // Delete manual entry as it is not necessary anymore
      delete resp.manual;
    }
    resp.responses = preparedScheme.code(responses);

    return resp;
  });

  return coded;
  //   return JSON.stringify(coded);
}
