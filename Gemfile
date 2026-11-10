source "https://rubygems.org"

gem "jekyll", "~> 4.4"

group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:windows, :jruby]

# Checks the built site for broken internal links, images and scripts in CI
group :test do
  gem "html-proofer", "~> 5.0"
end
