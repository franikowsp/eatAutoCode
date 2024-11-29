
<!-- README.md is generated from README.Rmd. Please edit that file -->

# eatAutoCode

<!-- badges: start -->
<!-- badges: end -->

The goal of eatAutoCode is to code responses from IQB Testcenter.

## Installation

You can install the development version of eatAutoCode from
[GitHub](https://github.com/) with:

``` r
# install.packages("devtools")
devtools::install_github("franikowsp/eatAutoCode")
```

## Update

If you cloned the repository and want to update the version of the auto
coder, follow this guide.

First, all package need to be installed:

``` r
packer::npm_install()
```

Second, the auto coder needs to be updated:

``` r
packer::npm_install("@iqb/responses")
```

That’s it. To be sure that everything still works, please load the
package (`devtools::load_all(".")`) and run all of the tests
(`devtools::test()`) before pulling.

<!-- ## Example -->
<!-- This is a basic example which shows you how to solve a common problem: -->
<!-- ```{r example} -->
<!-- library(eatAutoCode) -->
<!-- ## basic example code -->
<!-- ``` -->
<!-- What is special about using `README.Rmd` instead of just `README.md`? You can include R chunks like so: -->
<!-- ```{r cars} -->
<!-- summary(cars) -->
<!-- ``` -->
<!-- You'll still need to render `README.Rmd` regularly, to keep `README.md` up-to-date. `devtools::build_readme()` is handy for this. You could also use GitHub Actions to re-render `README.Rmd` every time you push. An example workflow can be found here: <https://github.com/r-lib/actions/tree/v1/examples>. -->
<!-- You can also embed plots, for example: -->
<!-- ```{r pressure, echo = FALSE} -->
<!-- plot(pressure) -->
<!-- ``` -->
<!-- In that case, don't forget to commit and push the resulting figure files, so they display on GitHub and CRAN. -->
