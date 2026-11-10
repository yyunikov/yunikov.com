# yunikov.com

Personal website built with [Jekyll](https://jekyllrb.com/) 4 and deployed to [GitHub Pages](https://pages.github.com/) by the GitHub Actions workflow in `.github/workflows/pages.yml`. The layouts and styles come from the [Jekyll-Uno theme](https://github.com/joshgerdes/jekyll-uno) (via the [matthiaslischka fork](https://github.com/matthiaslischka/jekyll-uno)), copied into this repo. See `LICENSE-jekyll-uno` for the theme's license.

## Local development

With Docker:

- `docker compose up`
- open http://localhost:4000

Without Docker, install the Ruby version in `.ruby-version`, then:

- `bundle install`
- `bundle exec jekyll serve --livereload`

License
=================

   Copyright (c) 2026 Yuriy Yunikov
   
   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:
   
   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.
   
   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.