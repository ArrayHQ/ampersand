module.exports = function(grunt) {

    // Configure tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            css: {
                files: ['**/*.scss'],
                tasks: ['autoprefixer', 'csscomb'],
                options: {
                    spawn: false,
                    livereload: true,
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 9']
            },
            single_file: {
                src: 'style.css',
                dest: 'style.css'
            }
        },

        csscomb: {
            options: {
                config: '.csscomb.json'
            },
            files: {
                'style.css': ['style.css'],
            }
        },

        // Build for Creative Market
        'string-replace': {
        dist: {
            files: {
                    './':
                    'inc/admin/getting-started/getting-started.php'
                },
                options: {
                    replacements: [
                        {
                            pattern: 'page to view the help file, access theme updates or ask us a question.',
                            replacement: 'page to view the help file and latest theme updates.'
                        },
                        {
                            pattern: /hide-cm/g,
                            replacement: 'hide-creative'
                        },
                        {
                            pattern: /show-cm/g,
                            replacement: 'show-creative'
                        }
                    ]
                }
            }
        },

        shell: {
            makeDir: {
                command: 'zip -r ../ampersand.zip ../ampersand -x@../exclude.lst'
            }
        }
    });

    // Watch
    grunt.loadNpmTasks('grunt-contrib-watch');

    // CSSComb
    grunt.loadNpmTasks('grunt-csscomb');

    // Autoprefixer
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Replace
    grunt.loadNpmTasks('grunt-string-replace');

    // Shell
    grunt.loadNpmTasks('grunt-shell');

    // Register tasks
    grunt.registerTask('default', [
        'watch',
        'autoprefixer',
        'csscomb',
        'string-replace',
        'shell'
    ]);

    // Build for Creative Market
    grunt.registerTask('creative', ['shell', 'string-replace' ])

};