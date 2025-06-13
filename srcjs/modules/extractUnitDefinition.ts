function collectIdsWithKeyedPaths(
  node,
  path = {},
  collected = [],
  visibility = null
) {
  if (Array.isArray(node)) {
    node.forEach((child, index) => {
      collectIdsWithKeyedPaths(child, path, collected, visibility);
    });
    return collected;
  }

  if (typeof node === "object" && node !== null) {
    // Update visibility if we're at a 'pages' level object
    if ("alwaysVisible" in node && "sections" in node) {
      visibility = node.alwaysVisible;
    }

    // If the object has an 'id', store it with metadata and path
    if ("id" in node) {
      collected.push({
        id: node.id,
        markingPanels: node.markingPanels,
        connectedTo: node.connectedTo,
        alwaysVisible: visibility,
        path: { ...path },
      });
    }

    // Recursively traverse properties
    for (const key in node) {
      const value = node[key];

      if (Array.isArray(value)) {
        value.forEach((child, index) => {
          const newPath = { ...path, [key]: index };
          collectIdsWithKeyedPaths(child, newPath, collected, visibility);
        });
      } else if (typeof value === "object" && value !== null) {
        collectIdsWithKeyedPaths(value, path, collected, visibility);
      }
    }
  }

  return collected;
}

export const extractUnitDefinition = function (params: {
  unitDefinition: any;
}): any {
  const { unitDefinition } = params;

  return collectIdsWithKeyedPaths(unitDefinition);
};
