# to delete prolific ids

read.pcibex <- function(
  filepath,
  auto.colnames = TRUE,
  fun.col = function(col, cols) {
    cols[cols == col] <- paste(col, "Ibex", sep = ".")
    return(cols)
  }
) {
  n.cols <- max(count.fields(filepath, sep = ",", quote = NULL), na.rm = TRUE)
  if (auto.colnames) {
    cols <- c()
    con <- file(filepath, "r")
    while (TRUE) {
      line <- readLines(con, n = 1, warn = FALSE)
      if (length(line) == 0) {
        break
      }
      m <- regmatches(line, regexec("^# (\\d+)\\. (.+)\\.$", line))[[1]]
      if (length(m) == 3) {
        index <- as.numeric(m[2])
        value <- m[3]
        if (is.function(fun.col)) {
          cols <- fun.col(value, cols)
        }
        cols[index] <- value
        if (index == n.cols) {
          break
        }
      }
    }
    close(con)
    return(read.csv(
      filepath,
      comment.char = "#",
      header = FALSE,
      col.names = cols
    ))
  } else {
    return(read.csv(
      filepath,
      comment.char = "#",
      header = FALSE,
      col.names = seq(1:n.cols)
    ))
  }
}

library(data.table)


drop_penultimate_pcibex <- function(infile, outfile = infile) {
  # read with your PCIbex-aware reader
  df <- read.pcibex(infile)

  if (ncol(df) < 2L) {
    warning("File has fewer than 2 columns; nothing to drop.")
  } else {
    rm_idx <- ncol(df) - 1L
    rm_name <- names(df)[rm_idx]
    df[[rm_idx]] <- NULL
    message(sprintf("Dropped penultimate column: %s", rm_name))
  }

  # Fast write if data.table is available; otherwise base write.csv
  if (requireNamespace("data.table", quietly = TRUE)) {
    data.table::fwrite(df, outfile)
  } else {
    utils::write.csv(df, outfile, row.names = FALSE)
  }

  invisible(outfile)
}

if (sys.nframe() == 0) {
  args <- commandArgs(trailingOnly = TRUE)
  if (length(args) >= 1) {
    drop_penultimate_pcibex(
      args[1],
      ifelse(length(args) >= 2, args[2], args[1])
    )
  }
}

locate <- function(x, y) {
  here::here("workspace", "data", paste0(x, "_", y, ".csv"))
}


drop_penultimate_pcibex(locate("exp2", "bare"), locate("exp2", "bare_clean"))
drop_penultimate_pcibex(
  locate("exp2", "haveto"),
  locate("exp2", "haveto_clean")
)
drop_penultimate_pcibex(locate("exp2", "will"), locate("exp2", "will_clean"))
drop_penultimate_pcibex(locate("exp2", "prob"), locate("exp2", "prob_clean"))

drop_penultimate_pcibex(locate("exp3", "bare"), locate("exp3", "bare_clean"))
drop_penultimate_pcibex(
  locate("exp3", "haveto"),
  locate("exp3", "haveto_clean")
)
drop_penultimate_pcibex(
  locate("exp4", "gotta_cond"),
  locate("exp4", "gotta_cond_clean")
)
drop_penultimate_pcibex(
  locate("exp4", "gotta_wellthen"),
  locate("exp4", "gotta_wellthen_clean")
)
