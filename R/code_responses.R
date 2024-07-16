#' Automatically code responses with coding scheme
#'
#' @param coding_schema List. Coding scheme of a unit from IQB Studio Lite.
#' @param responses List. Unit responses from IQB Testcenter.
#'
#' @return
#' @export
#'
#' @examples
code_responses <- function(coding_scheme, responses) {
  eatAutoCode$call("codeResponses",
                   list(codingScheme = coding_scheme,
                        responses = responses))
}
