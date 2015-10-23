module.exports = function(grunt) {
	grunt.initConfig({
		// compass: {
		// 	dist: {
		// 		options: {
		// 			sassDir: 'sass',
		// 			cssDir: 'css',
		// 			outputStyle: 'compressed'
		// 		}
		// 	}
		// },
        connect: {
          server: {
            options: {
              port: 9001,
              base: 'public',
              keepalive: true
            }
          }
        },
		watch: {
			// css: {
			// 	files: ['sass/*.scss'],
			// 	tasks: ['compass']
			// }
		}
	});

	// grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default',['connect']);
};
