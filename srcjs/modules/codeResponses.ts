import { ResponseStatusType } from "@iqbspecs/response/response.interface";
import { CodingSchemeFactory } from "@iqb/responses";
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
}): UnitsArray[] {
  const { codingScheme, responses, collapse, wrapStart, wrapEnd } = params;

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
      coded.value =
        coded.value === null
          ? "__MISSING__"
          : ["string", "number", "boolean"].includes(typeof coded.value)
          ? `${coded.value}`
          : Array.isArray(coded.value)
          ? coded.value.length === 0
            ? "__MISSING__"
            : coded.value.length > 1
            ? `${wrapStart}${coded.value.join(collapse)}${wrapEnd}`
            : `${wrapStart}${coded.value[0]}${wrapEnd}`
          : `${coded.value}`;

      return coded;
    });

    return resp;
  });

  return coded;
}
