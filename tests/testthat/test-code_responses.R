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
  test_resp <- readr::read_file(test_path("code_responses/responses.txt"))

  comp <- data.frame(
    id = c("b1", "b2", "b3"),
    status = rep("CODING_COMPLETE", 3),
    value = c("TRUE", "true", "1"),
    key = c("x1", NA, NA),
    code = c(1, 2, 2),
    score = c(1, 5, 2)
  )

  responses_coded <- code_responses(coding_scheme = test_cs,
                                    responses = test_resp)

  expect_equal(responses_coded, comp)
})
