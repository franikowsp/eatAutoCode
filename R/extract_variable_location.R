#' Extract variable locations from unit definition
#'
#' @param units Tibble. Must contain a column `definition` that contains unit definitions. Please note, that it is recommended to not extract more than 20 unit definitions at a time as the call is memory-consuming.
#' @param collapse Character. List values will be concatenated with this character. Defaults to `";;;"`.
#' @param wrap_start Character. List values will be wrapped with this character. Defaults to `"[[["`.
#' @param wrap_end Character. List values will be wrapped with this character. Defaults to `"´]]]"`.
#' @param missing Character. Placeholder for missing values. Will be transformed to `NA`. Defaults to `"___MISSING___"`.
#'
#' @return A data frame.
#' @export
extract_variable_location <- function(units,
                                      collapse = ";;;",
                                      wrap_start = "[[[",
                                      wrap_end = "]]]",
                                      missing = "___MISSING___") {
  output <- eatAutoCode$call("extractVariableLocation",
                             list(units = units,
                                  collapse = collapse,
                                  wrapStart = wrap_start,
                                  wrapEnd = wrap_end,
                                  missing = missing
                             ))

  output %>%
    tibble::as_tibble()
}
