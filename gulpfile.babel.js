import gulp from 'gulp';
import shell from 'gulp-shell';
import eslint from 'gulp-eslint';
import jasmine from 'gulp-jasmine';
import reporters from 'jasmine-reporters';
import rimraf from 'rimraf';
import run from 'run-sequence';

const paths = {
  js: ['./src/**/*.js'],
  destination: './app',
  spec: 'app/spec',
};


gulp.task('set-production-node-env', () => {
  process.env.NODE_ENV = 'production';
});

gulp.task('set-test-node-env', () => {
  process.env.NODE_ENV = 'test';
});

gulp.task('clean', (cb) => {
  rimraf(paths.destination, cb);
});

gulp.task('babel', shell.task([
  'babel src --out-dir app',
]));


gulp.task('lint', () => {
  return gulp.src(paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('jasmine', () => {
  return gulp.src('app/spec/unit/**/*.spec.js')
    .pipe(jasmine({
      reporter: new reporters.TerminalReporter({
        verbosity: 1,
        color: true,
        showStack: true,
      }),
    }));
});

gulp.task('build', (cb) => {
  run('lint', 'clean', 'babel', cb);
});

gulp.task('test', (cb) => {
  run('set-test-node-env', 'build', 'jasmine', cb);
});

gulp.task('run', shell.task([
  'node app/index.js',
]));

gulp.task('default', (cb) => {
  run('build', 'run', cb);
});
