eatAutoCode <- NULL

.onLoad <- function(libname, pkgname){
  eatAutoCode <<- V8::v8()

  # locate dependency file
  iqb_responses <- system.file("index.js", package = "eatAutoCode")
  eatAutoCode$source(iqb_responses)
}
