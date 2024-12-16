test_cs <- jsonlite::read_json(test_path("code_responses/coding-scheme.json"))

comp <- data.frame(
  id = c("b1", "b2", "b3"),
  status = rep("CODING_COMPLETE", 3),
  value = c("TRUE", "true", "1"),
  key = c("x1", NA, NA),
  code = c(1, 2, 2),
  score = c(1, 5, 2)
)

test_that("correctly scores examplary data from list object", {
  test_resp <- jsonlite::read_json(test_path("code_responses/responses.json"))

  responses_coded <- code_responses(coding_scheme = test_cs,
                                    responses = test_resp)

  expect_equal(responses_coded, comp)
})

test_that("correctly scores examplary data from JSON string", {
  test_resp <- readr::read_file(test_path("code_responses/responses.txt")) %>%
    jsonlite::parse_json() %>%
    purrr::keep(function(x) x$id == "elementCodes") %>%
    purrr::pluck(1, "content")

  responses_coded <- code_responses(coding_scheme = test_cs,
                                    responses = test_resp)

  expect_equal(responses_coded, comp)
})

comp <- data.frame(
  id = c("b1", "b2", "b3"),
  status = c("CODING_COMPLETE", "CODING_COMPLETE", "CODING_COMPLETE"),
  value = c("TRUE", "true", "1"),
  key = c("x1", NA, NA),
  code = c(31, -99, -97),
  score = c(1, 0, NA)
)

test_that("correctly adds and overwrites manual data", {
  test_resp <- readr::read_file(test_path("code_responses/responses.txt")) %>%
    jsonlite::parse_json() %>%
    purrr::keep(function(x) x$id == "elementCodes") %>%
    purrr::pluck(1, "content")

  test_code <- list(list(id = "b1", status = "CODING_COMPLETE", code = 31, score = 1),
                    list(id = "b2", status = "CODING_COMPLETE", code = -99, score = 0),
                    list(id = "b3", status = "CODING_COMPLETE", code = -97, score = NA))

  responses_coded <- code_responses(coding_scheme = test_cs,
                                    responses = test_resp,
                                    manual = test_code)

  expect_equal(responses_coded, comp)
})

# test_that("correctly treats missing responses", {
#   test_resp <- NA_character_
#
#   test_code <- list(list(id = "b1", status = "CODING_COMPLETE", code = 31, score = 1),
#                     list(id = "b2", status = "CODING_COMPLETE", code = -99, score = 0),
#                     list(id = "b3", status = "CODING_COMPLETE", code = -97, score = NA))
#
#   responses_coded <- code_responses(coding_scheme = test_cs,
#                                     responses = test_resp,
#                                     manual = test_code)
#
#   expect_equal(responses_coded, comp)
# })


# test_that("correctly adds and overwrites manual data stored as JSON", {
#   test_resp <- readr::read_file(test_path("code_responses/responses.txt")) %>%
#     jsonlite::parse_json() %>%
#     purrr::keep(function(x) x$id == "elementCodes") %>%
#     purrr::pluck(1, "content")
#
#   test_code <- list(list(id = "b1", status = "CODING_COMPLETE", code = 31, score = 1),
#                     list(id = "b2", status = "CODING_COMPLETE", code = -99, score = 0),
#                     list(id = "b3", status = "CODING_COMPLETE", code = -97, score = NA))
#
#   test_code_json <- jsonlite::toJSON(test_code, auto_unbox = TRUE)
#
#   responses_coded <- code_responses(coding_scheme = test_cs,
#                                     responses = test_resp,
#                                     manual = test_code_json)
#
#   expect_equal(responses_coded, comp)
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
