// Type guards
const isJSONString = (input: unknown): input is string =>
  typeof input === "string";

export default function deparseJSON(obj: any): any {
  const output: any = isJSONString(obj) ? JSON.parse(obj) : obj;

  return output;
}
