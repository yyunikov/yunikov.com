module Jekyll
 
  class CategoryPageGenerator < Generator
    safe true
    priority :high
 
    def generate(site)
      main_cat_page = site.pages.select { |p| p.name == "category_page.html" }.first
 
      site.categories.each do |cat|
        cat_page = main_cat_page.clone
        cat_name = cat.first.gsub(/\s+/, '-')

        cat_page.data.merge!(
          "permalink" => "blog/categories/#{cat_name}/",
          "category_name" => cat_name)
        cat_page.render(site.layouts, site.site_payload)
 
        site.pages << cat_page
      end
 
    end
 
  end
end