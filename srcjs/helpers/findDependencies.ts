export default function findDependencies(data) {
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
      currentObj.value =
        ["string", "number", "logical"].includes(typeof currentObj.value) ||
        currentObj.value === null
          ? currentObj.value
          : currentObj.value.length === 0
          ? null
          : currentObj.value.length > 1
          ? `[[${currentObj.value.map((value) => value.alias).join(",")}]]`
          : currentObj.value.map((value) => value.alias);
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
