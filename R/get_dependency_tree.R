#' Displays the variable dependency tree of a given coding scheme
#'
#' @param coding_scheme List. Coding scheme of a unit from IQB Studio Lite.
#'
#' @return A data frame.
#' @export
get_dependency_tree <- function(coding_scheme) {
  eatAutoCode$call("getVariableDependencyTree",
                   list(codingScheme = coding_scheme))
}
