eatAutoCode <- NULL

.onLoad <- function(libname, pkgname){
  eatAutoCode <<- V8::v8()

  # locate dependency file
  iqb_responses <- system.file("responses/3.1.2/responses.min.js", package = "eatAutoCode")
  eatAutoCode$source(iqb_responses)
}
