const { spawn } = require('child_process')

spawn('stylus.cmd', [
  '-w',
  '-c', 'checking.styl',
  '-u', './node_modules/autoprefixer-stylus', '--with', "{ browsers: ['last 20 versions','ie 7', 'ie 8', 'ie 9', 'ie 10'] }",
  '-o', 'checking.css'
], {
  stdio: 'inherit'
})

spawn('ss-server', [
  'run'
], {
  shell: true
})
