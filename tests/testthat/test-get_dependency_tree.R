test_cs_flat <- jsonlite::read_json(test_path("code_responses/coding-scheme.json"))

comp_flat <- data.frame(
  id = c("b1", "b2", "b3"),
  level = c(0, 0, 0),
  sources = I(list(list(), list(), list())),
  page = c("0", "0", "0"),

  stringsAsFactors = FALSE
)
class(comp_flat$sources) <- NULL

test_that("correctly displays a nested dependency tree", {
  dependency_tree <- get_dependency_tree(coding_scheme = test_cs_flat)

  expect_equal(dependency_tree, comp_flat)
})

test_cs_nested2 <- jsonlite::read_json(test_path("get_dependency_tree/coding-scheme-level2.json"))

comp_nested2 <- data.frame(
  id = c("01a", "01b", "01"),
  level = c(0, 0, 1),
  sources = I(list(character(), character(), c("01a", "01b"))),
  page = c("0", "0", "0"),

  stringsAsFactors = FALSE
)
class(comp_nested2$sources) <- NULL

test_that("correctly displays a nested dependency tree", {
  dependency_tree <- get_dependency_tree(coding_scheme = test_cs_nested2)

  expect_equal(dependency_tree, comp_nested2)
})

test_cs_nested3 <- jsonlite::read_json(test_path("get_dependency_tree/coding-scheme-level3.json"))

comp_nested3 <- data.frame(
  id = c("01a_1", "01a_2", "01b", "01a", "01"),
  level = c(0, 0, 0, 1, 2),
  sources = I(list(character(), character(), character(), c("01a_1", "01a_2"), c("01a", "01b"))),
  page = c("0", "0", "0", "0", "0"),

  stringsAsFactors = FALSE
)
class(comp_nested3$sources) <- NULL

test_that("correctly displays a nested dependency tree", {
  dependency_tree <- get_dependency_tree(coding_scheme = test_cs_nested3)

  expect_equal(dependency_tree, comp_nested3)
})
