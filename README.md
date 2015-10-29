# yyunikov.github.io
Personal website. Is built using [Polymer](https://www.polymer-project.org/) framework, [Grunt](http://gruntjs.com/), [Jekyll](http://jekyllrb.com/) and [Github Pages](https://pages.github.com/).

# Branches
**dev** - contains the source files for the website

**master** - contains the generated production website

# Tasks
`grunt dev` - builds development version of files

`grunt prod` - builds production version of files (minified css, uglified js, etc.)

`grunt deploy` - deploys website to production

# Local development
To run website locally you need to have [Node.js](http://nodejs.org/) and [Ruby](https://www.ruby-lang.org/) installed.

Run the following commands to start the website:

1. Install `grunt-cli` and `bower` globally with `npm install -g grunt-cli bower`
2. Run `npm install` (this will run `bower install` for you)
3. Then build with `grunt dev`
4. And run the server with `jekyll serve --watch`

After that you can check out the website running on `localhost:4000`

# Deployment
Deployment is done using [grunt build control](https://www.npmjs.com/package/grunt-build-control).

Check out the Gruntfile.js and change the following lines to your remote and branch:
```javascript
      pages: {
        options: {
          remote: 'git@github.com:yyunikov/yyunikov.github.io.git',
          branch: 'master'
        }
      }
```
Then run `grunt deploy` command to deploy generated website to the specified branch.

License
=================

   Copyright 2015 Yuriy Yunikov

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
