module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-build-control');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

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
    }
  });

  // Plugin and grunt tasks.
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['vulcanize', 'uglify', 'cssmin','jekyll:build']);
  grunt.registerTask('deploy', ['vulcanize', 'uglify', 'cssmin', 'jekyll:build', 'buildcontrol:pages']);
};
