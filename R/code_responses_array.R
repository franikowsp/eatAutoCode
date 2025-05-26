#' Automatically code responses with coding scheme
#'
#' @param coding_scheme List. Coding scheme of a unit from IQB Studio Lite.
#' @param responses List. Unit responses from IQB Testcenter.
#'
#' @return A data frame.
#' @export
code_responses_array <- function(coding_scheme, responses) {
  output <- eatAutoCode$call("codeResponsesArray",
                             list(codingScheme = coding_scheme,
                                  responses = responses))

  output %>%
    dplyr::as_tibble() %>%
    dplyr::mutate(
      responses = purrr::map(responses, function(x) {
        x %>% dplyr::mutate(dplyr::across(dplyr::any_of(c("value")),
                                          as.character))
      })
    ) %>%
    tidyr::unnest(responses)
}
