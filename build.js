var cheerio = require('cheerio')
var fs = require('fs')
var path = require('path')
var minify = require('html-minifier').minify

var content = fs.readFileSync('./index.html', 'utf-8')
const $ = cheerio.load(content)

const keys = {
  'gif': 'image/gif',
  'jpg': 'image/jpeg'
}

$('img').each(function (index, el) {
  let $el = $(el)
  let filename = $el.attr('src')
  let ext = filename.substr(filename.lastIndexOf('.') + 1)
  let bitmap = fs.readFileSync(path.resolve(__dirname, filename))
  var content = new Buffer(bitmap).toString('base64')
  var data = 'data:' + keys[ext] + ';base64,' + content
  $el.attr('src', data)
})

$('link').each(function (index, link) {
  let $link = $(link)
  $('head').append(`<style id="link-${index}" type="text/css"></style>`)
  let css = fs.readFileSync($link.attr('href'), 'utf-8')
  let style = $(`#link-${index}`)
  style.html(css)
  $link.remove()
  style.removeAttr('id')
})

fs.writeFile(
  path.resolve(__dirname, 'dist/index.html'),
  minify($.html(), { removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true }),
  // $.html(),
  function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log('success')
  })
