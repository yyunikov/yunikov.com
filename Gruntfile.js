module.exports = function(grunt) {

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
// TODO restore vulcanization when 'Already registered' issues will be fixed
/*    vulcanize: {
      options: {
        strip: true,
        csp: true,
        inline: true
      },
      elements: {
        options: {
          excludes: {
            imports: [
              "polymer.html"
            ]
          }
        },
        files: {
          'elements/app-layout.vulcanized.html': 'elements/app-layout.html'
        }
      }
    }*/

  });

  // Plugin and grunt tasks.
  require('load-grunt-tasks')(grunt);

  // Task to run vulcanize and build the jekyll site
  //grunt.registerTask('default', ['vulcanize', 'jekyll:build']);

  grunt.registerTask('default', ['jekyll:build']);
};
