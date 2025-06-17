import { concatenateValueDefault } from "./concatenateValue";

export default function findDependencies({
  data,
  collapse,
  wrapStart,
  wrapEnd,
  missing,
}) {
  return data.map((currentObj, _, arr) => {
    const connectedIds =
      currentObj.connectedTo || currentObj.markingPanels || [];

    const dependencies = connectedIds.flatMap((depId) => {
      return arr
        .filter(({ id }) => id === depId)
        .map((match) => ({
          variable_dependency_ref: match.id,
          variable_dependency_path: match.path,
          variable_dependency_page_always_visible: match.alwaysVisible,
        }));
    });

    if (currentObj.value) {
      currentObj.value = concatenateValueDefault({
        value: currentObj.value,
        collapse: collapse,
        wrapStart: wrapStart,
        wrapEnd: wrapEnd,
        missing: missing,
      });
    }

    return {
      variable_id: currentObj.alias,
      variable_ref: currentObj.id,
      variable_path: currentObj.path,
      variable_page_always_visible: currentObj.alwaysVisible,
      variable_dependencies: dependencies,
      value_default: currentObj.value,
    };
  });
}
