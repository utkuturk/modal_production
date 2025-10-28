render-analysis:
	quarto render workspace/analysis

publish-analysis: render-analysis
	git add workspace/analysis/docs
	git commit -m "Publish analysis site"
	git push