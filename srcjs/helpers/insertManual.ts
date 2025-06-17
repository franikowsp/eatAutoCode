import { ResponseStatusType } from "@iqbspecs/response/response.interface";

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

export default function insertManual(params: {
  responses: UnitResponses[];
  manual: ManualCodes[];
}): UnitResponses[] {
  const { responses, manual } = params;

  // Create a lookup object for `manual`
  const manualMap = manual.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});

  // Update `responses` using the lookup object
  const updatedObj = responses.map((item) =>
    manualMap[item.id] ? { ...item, ...manualMap[item.id] } : item
  );

  // Add new items from `manual` not in `responses`
  const newItems = manual.filter(
    (item) => !responses.some((o) => o.id === item.id)
  );

  return [...updatedObj, ...newItems];
}
