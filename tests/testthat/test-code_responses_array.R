test_cs <- jsonlite::read_json(test_path("code_responses/coding-scheme.json"))

comp <- data.frame(
  id = c("b1", "b2", "b3"),
  status = rep("CODING_COMPLETE", 3),
  value = c("TRUE", "true", "1"),
  key = c("x1", NA, NA),
  code = c(1, 2, 2),
  score = c(1, 5, 2)
)

comp_array <- purrr::map(
  1:3,
  function(x) list(unit_key = paste0("A", x), responses = comp)
) %>%
  purrr::list_transpose() %>%
  dplyr::as_tibble() %>%
  tidyr::unnest(responses)

test_that("correctly scores examplary data from list object", {
  test_resp <- jsonlite::read_json(test_path("code_responses/responses.json"))

  test_resp_array <- purrr::map(
    1:3,
    function(x) list(unit_key = paste0("A", x), responses = test_resp)
  )

  responses_coded <-
    code_responses_array(coding_scheme = test_cs,
                         responses = test_resp_array)

  expect_equal(responses_coded, comp_array)
})

test_that("correctly scores examplary data from array of JSON string", {
  test_resp <- readr::read_file(test_path("code_responses/responses.txt")) %>%
    jsonlite::parse_json() %>%
    purrr::keep(function(x) x$id == "elementCodes") %>%
    purrr::pluck(1, "content")

  test_resp_array <- purrr::map(
    1:3,
    function(x) list(unit_key = paste0("A", x), responses = test_resp)
  )

  responses_coded <- code_responses_array(coding_scheme = test_cs,
                                          responses = test_resp_array)

  expect_equal(responses_coded, comp_array)
})

test_that("correctly scores examplary data from JSON string", {
  test_resp <- readr::read_file(test_path("code_responses/responses.txt")) %>%
    jsonlite::parse_json() %>%
    purrr::keep(function(x) x$id == "elementCodes") %>%
    purrr::pluck(1, "content")

  test_resp_array <- purrr::map(
    1:3,
    function(x) list(unit_key = paste0("A", x), responses = test_resp)
  ) %>% jsonlite::toJSON(auto_unbox = TRUE, null = "null")

  responses_coded <- code_responses_array(coding_scheme = test_cs,
                                          responses = test_resp_array)

  expect_equal(responses_coded, comp_array)
})

test_that("correctly scores examplary data from JSON string", {
  test_resp <- readr::read_file(test_path("code_responses/responses.txt")) %>%
    jsonlite::parse_json() %>%
    purrr::keep(function(x) x$id == "elementCodes") %>%
    purrr::pluck(1, "content")

  test_resp_array <- purrr::map(
    1:3,
    function(x) list(unit_key = paste0("A", x), responses = test_resp)
  ) %>% jsonlite::toJSON(auto_unbox = TRUE, null = "null")

  responses_coded <- code_responses_array(coding_scheme = test_cs,
                                          responses = test_resp_array)

  expect_equal(responses_coded, comp_array)
})

comp <- data.frame(
  id = c("b1", "b2", "b3"),
  status = rep("CODING_COMPLETE", 3),
  value = c("TRUE", "true", "1"),
  key = c("x1", NA, NA),
  code = c(-99, 2, 2),
  score = c(NA, 5, 2)
)

comp_array <- purrr::map(
  1:3,
  function(x) list(unit_key = paste0("A", x), responses = comp)
) %>%
  purrr::list_transpose() %>%
  dplyr::as_tibble() %>%
  tidyr::unnest(responses)

test_that("correctly scores examplary data from list object with manual insertions", {
  test_resp <- jsonlite::read_json(test_path("code_responses/responses.json"))

  test_resp_array <- purrr::map(
    1:3,
    function(x) list(unit_key = paste0("A", x), responses = test_resp,
                     manual = list(list(
                       id = "b1",
                       status = "CODING_COMPLETE",
                       code = -99,
                       score = NA
                     )))
  )

  responses_coded <-
    code_responses_array(coding_scheme = test_cs,
                         responses = test_resp_array)

  expect_equal(responses_coded, comp_array)
})

# test_that("correctly scores examplary data from list object with manual insertions", {
#   test_resp <- NA_character_
#
#   test_resp_array <- purrr::map(
#     1:3,
#     function(x) list(unit_key = paste0("A", x), responses = test_resp,
#                      manual = list(list(
#                        id = "b1",
#                        status = "CODING_COMPLETE",
#                        code = -99,
#                        score = NA
#                      )))
#   )
#
#   responses_coded <-
#     code_responses_array(coding_scheme = test_cs,
#                          responses = test_resp_array)
#
#   expect_equal(responses_coded, comp_array)
# })

# test_that("correctly aggregates missing data", {
# test_resp <- readr::read_file(test_path("code_responses/responses.txt")) %>%
#   jsonlite::parse_json() %>%
#   purrr::keep(function(x) x$id == "elementCodes") %>%
#   purrr::pluck(1, "content")
#
# comp <- data.frame(
#   id = c("b1", "b2", "b3"),
#   status = rep("CODING_COMPLETE", 3),
#   value = c("TRUE", "true", "1"),
#   key = c("x1", NA, NA),
#   code = c(1, 2, 2),
#   score = c(1, 5, 2)
# )
#
# responses_coded <- code_responses(coding_scheme = test_cs,
#                                   responses = test_resp)
#
# expect_equal(responses_coded, comp)
# })
