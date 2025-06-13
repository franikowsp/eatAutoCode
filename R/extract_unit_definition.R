#' Extract variable locations from unit definition
#'
#' @param units Tibble. Must contain a column `definition` that contains unit definitions.
#'
#' @return A data frame.
#' @export
extract_variable_location <- function(units) {
  eatAutoCode$call("extractVariableLocation",
                   list(units = units))
}
