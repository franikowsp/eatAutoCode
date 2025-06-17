eatAutoCode <- NULL

.onLoad <- function(libname, pkgname){
  eatAutoCode <<- V8::v8()

  version <- utils::packageVersion(pkgname)

  js_packages <- system.file("packageVersion.json", package = "eatAutoCode")
  js_package_versions <- jsonlite::read_json(js_packages, simplifyVector = TRUE)[c("@iqb/responses")] %>%
    stringr::str_remove("\\^")

  cli::cli_alert_info("{.pkg {pkgname}} v{version}",
                      class = "packageStartupMessage")

  cli::cli_alert("Autocoder {.pkg @iqb/responses} v{js_package_versions}",
                 class = "packageStartupMessage")

  # locate dependency file
  iqb_responses <- system.file("index.js", package = "eatAutoCode")
  eatAutoCode$source(iqb_responses)
}
