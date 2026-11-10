# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website for www.yunikov.com (`CNAME`), a Jekyll 4 site. This is a public repo. `.github/workflows/pages.yml` builds it with `JEKYLL_ENV=production` on every push and PR, and deploys to GitHub Pages from `master` only. There is no linter or test suite; a clean `jekyll build` is the check.

## Local development

- `docker compose up` runs `bundle install` and `jekyll serve --livereload` in the official `ruby` image (version matches `.ruby-version`), then open http://localhost:4000. Gems are cached in the `bundle` Docker volume.
- Without Docker: install the Ruby in `.ruby-version`, then `bundle exec jekyll serve`.
- One-off production build: `docker compose run --rm -e JEKYLL_ENV=production jekyll bundle exec jekyll build`.
- `Gemfile.lock` lists the `ruby`, `x86_64-linux-gnu` (CI), `aarch64-linux-gnu` (Docker on Apple Silicon) and `arm64-darwin` platforms. Keep them when updating gems.

## Architecture

- The theme is a copy of `matthiaslischka/jekyll-uno` (a fork of `joshgerdes/jekyll-uno`, MIT, see `LICENSE-jekyll-uno`) kept in this repo: `_layouts/`, `_sass/`, `assets/css/`, `assets/fonts/`, `assets/js/main.js`, `_includes/head.html` and `_includes/pagination.html`. It is not a gem or remote theme, so edit these files directly.
- `_includes/header.html` builds the side panel: social links driven by `site.author.*` in `_config.yml`, plus hard-coded nav entries for Blog, Presentations and Apps. A new top-level page needs a nav entry here.
- `_includes/head.html` holds meta tags, favicons (from `images/favicons/`) and the GA4 tag (`site.google_analytics`), which only renders when `JEKYLL_ENV=production`.
- `assets/js/main.js` (theme, jQuery) handles the panel collapse when opening the blog. `assets/js/snake.js` is a p5.js snake game drawn behind the page.
- `jekyll-sitemap` generates `sitemap.xml`; use `sitemap: false` in front matter to exclude a page. `assets/feed.xml` (RSS), `assets/tags.md` and `assets/categories.md` set their own permalinks at the site root.
- Sass is compiled by Dart Sass (`sass-embedded`). Use `@use`, not `@import`, for Sass partials.

## Blog posts

Posts in `_posts/` are short stubs that link to articles published elsewhere (VGS blog, Primer blog). Filename format is `YYYY-MM-DD-slug.md`; permalinks are `/:year/:month/:day/:title/`. Follow the existing front matter:

```markdown
---
title: API-first engineering at Primer
layout: post
tags: [api]
---

See <a href="https://primer.io/blog/..." style="font-weight:bold" title="..." target="_blank" rel="noopener"> Primer's blog post</a>.
```
