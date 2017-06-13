const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const mime = require('mime')

const port = '3000'
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Hello World')
    return
  }
  if (req.url === '/favicon.ico') return //不响应favicon请求

  // 获取url->patnname 即文件名
  let pathname = path.join(__dirname, url.parse(req.url).pathname)
  pathname = decodeURIComponent(pathname) // url解码，防止中文路径出错
  if (fs.existsSync(pathname)) {
    if (!fs.statSync(pathname).isDirectory()) {
      // 以binary读取文件
      fs.readFile(pathname, 'binary', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end(JSON.stringify(err))
          return false
        }
        res.writeHead(200, {
          'Content-Type': `${mime.lookup(pathname)};charset:UTF-8`
        })
        res.write(data, 'binary')
        res.end()
      })
    } else {
      res.statusCode = 404;
      res.end('Directory Not Support')
    }

  } else {
      res.statusCode = 404;
      res.end('File Not Found')
  }
});
server.listen(port);