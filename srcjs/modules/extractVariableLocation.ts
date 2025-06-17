import collectIdsWithKeyedPaths from "../helpers/collectIdsWithKeyedPaths";
import findDependencies from "../helpers/findDependencies";

export const extractVariableLocation = function (params: {
  units: any;
  collapse: string;
  missing: string;
  wrapStart: string;
  wrapEnd: string;
}): any {
  const { units, collapse, missing, wrapStart, wrapEnd } = params;

  return units.map((unit) => {
    const { definition } = unit;

    const definitionParsed = JSON.parse(definition);

    const data = collectIdsWithKeyedPaths(definitionParsed);
    unit.variable_pages = findDependencies({
      data: data,
      collapse: collapse,
      missing: missing,
      wrapStart: wrapStart,
      wrapEnd: wrapEnd,
    });

    delete unit.definition;

    return unit;
  });
};
