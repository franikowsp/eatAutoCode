export default function collectIdsWithKeyedPaths(
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

    // Only collect if not under a skipped key
    if ("id" in node && !skipCollect) {
      collected.push({
        id: node.id,
        alias: node.alias,
        markingPanels: node.markingPanels,
        connectedTo: node.connectedTo,
        alwaysVisible: visibility,
        value: node.value,
        path: { ...path },
      });
    }

    for (const key in node) {
      const value = node[key];
      const shouldSkip =
        skipCollect || ["value", "visibilityRules"].includes(key);

      if (Array.isArray(value)) {
        value.forEach((child, index) => {
          const newPath = { ...path, [key]: index };
          collectIdsWithKeyedPaths(
            child,
            newPath,
            collected,
            visibility,
            shouldSkip
          );
        });
      } else if (typeof value === "object" && value !== null) {
        const newPath = { ...path, [key]: 0 }; // object branch, no index
        collectIdsWithKeyedPaths(
          value,
          newPath,
          collected,
          visibility,
          shouldSkip
        );
      }
    }
  }

  return collected;
}
