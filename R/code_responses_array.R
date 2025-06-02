#' Automatically code responses with coding scheme
#'
#' @param coding_scheme List. Coding scheme of a unit from IQB Studio Lite.
#' @param responses List. Unit responses from IQB Testcenter.
#'
#' @return A data frame. Please not that the value column is coerced to a character, i.e., list entries of `c("a", "b")` are concatenated to `[[a,b]]`.
#'
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
                                          concatenate_character))
      })
    ) %>%
    tidyr::unnest(responses)
}

concatenate_character <- function(value) {
  purrr::map_chr(value, function(x) {
    if (length(x) == 0) {
      NA_character_
    } else if (length(x) == 1) {
      as.character(x)
    } else {
      list_vals <- stringr::str_c(x, collapse = ",")
      stringr::str_glue("[[{list_vals}]]")
    }
  })
}
