import gulp from 'gulp';
import shell from 'gulp-shell';
import eslint from 'gulp-eslint';
import jasmine from 'gulp-jasmine';
import zip from 'gulp-zip';
import reporters from 'jasmine-reporters';
import rimraf from 'gulp-rimraf';
import run from 'run-sequence';
import { argv } from 'yargs';

const paths = {
  js: ['./src/**/*.js'],
  destination: './app',
  spec: 'app/spec',
  scripts: 'app/scripts',
  tmp: 'tmp',
  zipSource: ['./app/**/*', './node_modules/**/*'],
};

gulp.task('set-production-node-env', () => {
  process.env.NODE_ENV = 'production';
});

gulp.task('set-development-node-env', () => {
  process.env.NODE_ENV = 'development';
});

gulp.task('set-test-node-env', () => {
  process.env.NODE_ENV = 'test';
});

gulp.task('clean', () => {
  return gulp.src([paths.destination, paths.tmp])
    .pipe(rimraf());
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

gulp.task('zip', () => {
  return gulp.src(paths.zipSource, { base: '.' })
    .pipe(zip('app.zip'))
    .pipe(gulp.dest('tmp'));
});

gulp.task('build', (cb) => {
  run('lint', 'clean', 'babel', cb);
});

gulp.task('test', (cb) => {
  run('set-test-node-env', 'build', 'jasmine', cb);
});

gulp.task('run_index', shell.task([
  'node app/index.js',
]));


gulp.task('run', (cb) => {
  run('set-development-node-env', 'run_index', cb);
});

gulp.task('validate_deploy_params', () => {
  if (argv.token === undefined) {
    throw new Error('Please provide the Iron.io "token" parameter');
  }

  if (argv.project_id === undefined) {
    throw new Error('Please provide the Iron.io "project_id" parameter');
  }

  if (argv.name === undefined) {
    throw new Error('Please provide the Iron.io "name" parameter');
  }
});

gulp.task('iron_upload', shell.task([
  `IRON_PROJECT_ID=${argv.project_id} IRON_TOKEN=${argv.token} \
  iron worker upload --max-concurrency 1 --zip tmp/app.zip \
  --name ${argv.name} iron/images:node-4.1 node app/index.js`,
]));

gulp.task('deploy', (cb) => {
  run('validate_deploy_params', 'test', 'zip', 'iron_upload', cb);
});

gulp.task('default', (cb) => {
  run('test', 'run', cb);
});
