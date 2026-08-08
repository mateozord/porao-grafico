const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

const port = Number(process.env.PORT || 5173)
const root = path.join(__dirname, '..', 'dist')

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
}

function send(res, status, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Cache-Control': 'no-store',
  })
  res.end(body)
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${port}`)
  const requestedPath = decodeURIComponent(url.pathname)
  const cleanPath = requestedPath === '/' ? '/index.html' : requestedPath
  const filePath = path.normalize(path.join(root, cleanPath))

  if (!filePath.startsWith(root)) {
    send(res, 403, 'Forbidden')
    return
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      fs.readFile(path.join(root, 'index.html'), (fallbackError, fallbackData) => {
        if (fallbackError) {
          send(res, 404, 'Not found')
          return
        }
        send(res, 200, fallbackData, types['.html'])
      })
      return
    }

    send(res, 200, data, types[path.extname(filePath)] || 'application/octet-stream')
  })
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log('')
    console.log(`A porta ${port} ja esta em uso.`)
    console.log('Feche outras janelas antigas do site e rode este arquivo de novo.')
    console.log('')
    return
  }
  throw error
})

server.listen(port, '127.0.0.1', () => {
  console.log(`PORAO GRAFICO rodando em http://127.0.0.1:${port}`)
})
