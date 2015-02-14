module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-build-control');

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
    }

  });

  // Plugin and grunt tasks.
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('build', ['vulcanize', 'jekyll:build']);
  grunt.registerTask('deploy', ['vulcanize', 'jekyll:build', 'buildcontrol:pages']);
};
