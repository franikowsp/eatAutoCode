% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/code_responses.R
\name{code_responses}
\alias{code_responses}
\title{Automatically code responses with coding scheme}
\usage{
code_responses(coding_scheme, responses, manual = "null")
}
\arguments{
\item{coding_scheme}{List or character. Coding scheme of a unit from IQB Studio Lite.}

\item{responses}{List or character. Unit responses from IQB Testcenter.}

\item{manual}{List or character. Manual codes to potentially overwrite response data. Defaults to `"null"` (would be treated in the same way as `NA`).}
}
\value{
A data frame.
}
\description{
Automatically code responses with coding scheme
}
