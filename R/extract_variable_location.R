#' Extract variable locations from unit definition
#'
#' @param units Tibble. Must contain a column `definition` that contains unit definitions. Please note, that it is recommended to not extract more than 20 unit definitions at a time as the call is memory-consuming.
#'
#' @return A data frame.
#' @export
extract_variable_location <- function(units) {
  output <- eatAutoCode$call("extractVariableLocation",
                             list(units = units))

  output %>%
    tibble::as_tibble()
}
