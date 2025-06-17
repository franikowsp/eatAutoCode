import { ResponseStatusType } from "@iqbspecs/response/response.interface";
import { CodingSchemeFactory } from "@iqb/responses";
import insertManual from "../helpers/insertManual";
import deparseJSON from "../helpers/deparseJSON";
import { concatenateValue } from "../helpers/concatenateValue";

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
  // const { variableCodings }: { variableCodings: any } =
  //   deparseJSON(codingScheme);
  // const preparedScheme = CodingSchemeFactory(codingScheme.variableCodings);

  let responsesToCode: UnitResponses[] = deparseJSON(responses);
  const manualToInsert: ManualCodes[] | null = manual && deparseJSON(manual);

  if (manualToInsert !== null) {
    responsesToCode = insertManual({
      responses: responsesToCode,
      manual: manualToInsert,
    });
  }

  // Create CodingSchemeFactory instance and code responses
  const coded = CodingSchemeFactory.code(
    responsesToCode,
    codingScheme.variableCodings
  );
  return coded;
}

export function codeResponsesArray(params: {
  codingScheme: any;
  responses: UnitsArray[] | string;
  collapse: string;
  wrapStart: string;
  wrapEnd: string;
  missing: string;
}): UnitsArray[] {
  const { codingScheme, responses, collapse, wrapStart, wrapEnd, missing } =
    params;

  // Parse responses and variableCodings if it's a JSON string
  // const { variableCodings }: { variableCodings: any } =
  //   deparseJSON(codingScheme);
  // const preparedScheme = new CodingSchemeFactory(variableCodings);

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
    resp.responses = CodingSchemeFactory.code(
      responses,
      codingScheme.variableCodings
    ).map((coded) => {
      coded.value = concatenateValue({
        value: coded.value,
        collapse: collapse,
        wrapStart: wrapStart,
        wrapEnd: wrapEnd,
        missing: missing,
      });

      return coded;
    });

    return resp;
  });

  return coded;
}
