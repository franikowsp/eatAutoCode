#' Automatically code responses with coding scheme
#'
#' @param coding_scheme List. Coding scheme of a unit from IQB Studio Lite.
#' @param responses List. Unit responses from IQB Testcenter.
#'
#' @return A list.
#' @export
code_responses <- function(coding_scheme, responses) {
  eatAutoCode$call("codeResponses",
                   list(codingScheme = coding_scheme,
                        responses = responses))
}
