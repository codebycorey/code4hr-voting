module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'public',
                    keepalive: true
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['connect']);
};