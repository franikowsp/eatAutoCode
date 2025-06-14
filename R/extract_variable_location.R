#' Extract variable locations from unit definition
#'
#' @param units Tibble. Must contain a column `definition` that contains unit definitions.
#'
#' @return A data frame.
#' @export
extract_variable_location <- function(units) {
  # Use another AutoCoder instance (this is very memory-consuming)
  # TODO: Is this still necessary after applying the batching fix?
  ctx <- V8::v8()
  ctx$source(system.file("index.js", package = "eatAutoCode"))

  output <- eatAutoCode$call("extractVariableLocation",
                             list(units = units))

  output %>%
    tibble::as_tibble()
}
