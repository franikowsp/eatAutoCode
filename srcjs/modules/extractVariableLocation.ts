import collectIdsWithKeyedPaths from "../helpers/collectIdsWithKeyedPaths";
import findDependencies from "../helpers/findDependencies";

export const extractVariableLocation = function (params: { units: any }): any {
  const { units } = params;

  return units.map((unit) => {
    const { definition } = unit;

    const definitionParsed = JSON.parse(definition);

    const data = collectIdsWithKeyedPaths(definitionParsed);
    unit.variable_pages = findDependencies(data);

    delete unit.definition;

    return unit;
  });
};
