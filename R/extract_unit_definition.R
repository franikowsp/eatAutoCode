#' Automatically code responses with coding scheme
#'
#' @param unit_definition List or character. Unit definition of a unit from IQB Studio.
#'
#' @return A data frame.
#' @export
extract_unit_definition <- function(unit_definition) {
  eatAutoCode$call("extractUnitDefinition",
                   list(unitDefinition = unit_definition))
}
