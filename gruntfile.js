module.exports = function(grunt) {


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        banner: '/* <%= pkg.name %> - version <%= pkg.version %>\n' +
            ' * <%= grunt.template.today("mm-dd-yyyy") %>\n' +
            ' * <%= grunt.template.date("h:MM:ss TT") %>\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n */\n',
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: ['public/assets/css/main.css']
                }
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'public/assets/css/main.css': 'src/scss/main.scss'
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
            },
            dist: {
                files: {
                    
                    'public/assets/js/script.min.js': ['src/js/vendor/jquery.min.js', 'src/js/vendor/bootstrap.min.js', 'src/js/vendor/TweenMax.min.js', 'src/js/vendor/SplitText.min.js', 'src/js/vendor/barba.min.js', 'src/js/vendor/Instafeed.js', 'src/js/index.js'],

                }


            },

            dev: {
                options: {
                    compress: false,
                    beautify: true,
                    mangle: false
                },
                files: {
                    'public/assets/js/script.min.js': 'src/js/*.js'
                }
            }
        },

        includes: {


            Index: {
                cwd: 'src/pages/',
                src: ['*.html', '*.php'],
                dest: './public/',
                options: {
                    includePath: 'src/partials/'
                }
            },

            Portraits: {
                cwd: 'src/pages/portraits',
                src: ['*.html', '*.php'],
                dest: './public/portraits',
                options: {
                    includePath: 'src/partials/'
                }
            },

            Couples: {
                cwd: 'src/pages/couples',
                src: ['*.html', '*.php'],
                dest: './public/couples',
                options: {
                    includePath: 'src/partials/'
                }
            },

            Weddings: {
                cwd: 'src/pages/weddings',
                src: ['*.html', '*.php'],
                dest: './public/weddings',
                options: {
                    includePath: 'src/partials/'
                }
            },

            About: {
                cwd: 'src/pages/about',
                src: ['*.html', '*.php'],
                dest: './public/about',
                options: {
                    includePath: 'src/partials/'
                }
            },




        },

         
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['src/partials/**/**/*.html', 'src/**/*.html' ],
                tasks: ['uglify:dist', 'includes:Index', 'includes:Couples', 'includes:Portraits', 'includes:Weddings', 'includes:About']

            }
        } // watch 
    }); // grunt.initConfig

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-includes');
    grunt.loadNpmTasks('grunt-banner');

    grunt.registerTask('default', ['uglify:dist','watch']);
    grunt.registerTask('deploy', ['uglify:dist', 'sass:dist', 'usebanner']);

};