function collectIdsWithKeyedPaths(
  node,
  path = {},
  collected = [],
  visibility = null,
  skipCollect = false
) {
  if (Array.isArray(node)) {
    node.forEach((child, index) => {
      collectIdsWithKeyedPaths(child, path, collected, visibility, skipCollect);
    });
    return collected;
  }

  if (typeof node === "object" && node !== null) {
    // If at a 'page' level object, update visibility
    if ("alwaysVisible" in node && "sections" in node) {
      visibility = node.alwaysVisible;
    }

    // Only collect if not under "value"
    if ("id" in node && !skipCollect) {
      collected.push({
        id: node.id,
        markingPanels: node.markingPanels,
        connectedTo: node.connectedTo,
        alwaysVisible: visibility,
        path: { ...path },
      });
    }

    for (const key in node) {
      const value = node[key];

      // Update path with current key/index if it's an array
      if (Array.isArray(value)) {
        value.forEach((child, index) => {
          const newPath = { ...path, [key]: index };
          const newSkip = skipCollect || key === "value";
          collectIdsWithKeyedPaths(
            child,
            newPath,
            collected,
            visibility,
            newSkip
          );
        });
      } else if (typeof value === "object" && value !== null) {
        const newSkip = skipCollect || key === "value";
        collectIdsWithKeyedPaths(value, path, collected, visibility, newSkip);
      }
    }
  }

  return collected;
}

function findDependencies(data) {
  return data.map((currentObj, _, arr) => {
    const connectedIds = currentObj.connectedTo || [];

    const dependencies = connectedIds.flatMap((depId) => {
      return arr
        .filter(({ id }) => id === depId)
        .map((match) => ({
          variable_dependency_id: match.id,
          variable_dependency_path: match.path,
          variable_dependency_page_always_visible: match.alwaysVisible,
        }));
    });

    return {
      variable_id: currentObj.id,
      variable_path: currentObj.path,
      variable_page_always_visible: currentObj.alwaysVisible,
      variable_dependencies: dependencies,
    };
  });
}

export const extractUnitDefinition = function (params: {
  unitDefinition: any;
}): any {
  const { unitDefinition } = params;

  const dataParsed = JSON.parse(unitDefinition);
  const dataIds = collectIdsWithKeyedPaths(dataParsed);
  return findDependencies(dataIds);
};
