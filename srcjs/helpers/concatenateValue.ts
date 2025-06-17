export function concatenateValue({
  value,
  collapse,
  wrapStart,
  wrapEnd,
  missing,
}): string {
  return value === null
    ? missing
    : ["string", "number", "boolean"].includes(typeof value)
    ? `${value}`
    : Array.isArray(value)
    ? value.length === 0
      ? missing
      : value.length > 1
      ? `${wrapStart}${value.join(collapse)}${wrapEnd}`
      : `${wrapStart}${value[0]}${wrapEnd}`
    : `${value}`;
}

export function concatenateValueDefault({
  value,
  collapse,
  wrapStart,
  wrapEnd,
  missing,
}): string {
  return value === null
    ? missing
    : ["string", "number", "boolean"].includes(typeof value)
    ? `${value}`
    : Array.isArray(value)
    ? value.length === 0
      ? missing
      : value.length > 1
      ? `${wrapStart}${value
          .map((value) => value.alias)
          .join(collapse)}${wrapEnd}`
      : `${wrapStart}${value.map((value) => value.alias)[0]}${wrapEnd}`
    : `${value}`;
}
