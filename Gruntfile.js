module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-env');

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    jekyllConfig: grunt.file.readYAML('_config.yml'),

    jekyll: {
      build: {
      },
      serve: {
        options: {
          watch: true
          //serve: true
        }
      }
    },
    buildcontrol: {
      options: {
        dir: '_site',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:yyunikov/yyunikov.github.io.git',
          branch: 'master'
        }
      }
    },
    vulcanize: {
      options: {
        strip: true,
        csp: true,
        inline: true
      },
      elements: {
        options: {
          excludes: {
            imports: [
              "polymer.html$"
            ]
          }
        },
        files: {
          'elements/common-elements.vulcanized.html': 'elements/common-elements.html'
        }
      }
    },
    cssmin: {
      dist: {
        src: [
            'css/main.css'
        ],
        dest: 'css/main.min.css'
      }
    },
    uglify: {
      my_target: {
        files: {
          'js/app.min.js': ['js/app.js']
        }
      }
    },
    env: {
      dev: {
        NODE_ENV: 'DEVELOPMENT',
      },
      prod: {     
        NODE_ENV: 'PRODUCTION',        
      },
    },
    preprocess : {
      dev : {
        files : {
          '_includes/header.processed.html' : 'templates/header.html',
          '_includes/footer.processed.html' : 'templates/footer.html'
        }
      },
      prod : {
          files : {
            '_includes/header.processed.html' : 'templates/header.html',
            '_includes/footer.processed.html' : 'templates/footer.html'
          }
      }
    }
  });

  // Plugin and grunt tasks.
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('dev', ['env:dev', 'preprocess:dev', 'jekyll:build']);
  grunt.registerTask('prod', ['vulcanize', 'uglify', 'cssmin', 'env:prod', 'preprocess:prod', 'jekyll:build']);
  grunt.registerTask('deploy', ['vulcanize', 'uglify', 'cssmin', 'env:prod', 'preprocess:prod', 'jekyll:build', 'buildcontrol:pages']);
};
