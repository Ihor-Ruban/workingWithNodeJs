// ===== Node.js =====
// - прочитати файл
// - вивести текст із файлу в консоль

// const fs = require('fs')

// fs.readFile('./file.txt', 'utf8', (err, data) => {
//   if (err) throw err
//   console.log(data)
// })

// ________________________________________________________________________

// лвл 1
// зробити  простий сервер з тупим роутом на іфах
// лвл 2
// зробити в роуті роут який буде віддавати файл з малюнком(назва файлу має  бути вказана в урл). Опціонально браузер має не качати малюнок а показати його в браузері.
// лвл 3
// зробитиодин роут, який показує різні статті в залежності від того який ID написаний в урл

const http = require('http')
const fs = require('fs')
const mime = require('mime')

//Створюємо сервер з обробником запитів
const server = http.createServer((req, res) => {
  //Перевіряємо URL запиту
  if (req.url === '/hello') {
    //Якщо URL відповідає роуту /hello, відправляємо вітання
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.write('Привіт, світ!')
    res.end()
  } else if (req.url.startsWith('/image/')) {
    //роут із зображенням
    const filename = req.url.substring(7)
    const filepath = `./images/${filename}`

    fs.readFile(filepath, (err, data) => {
      if (err) return next(err)
      const contentType = mime.getType(filepath)
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    })
  } else if (req.url.startsWith('/article/')) {
    const id = req.url.substring(9)
    const filepath = `./articles/${id}.html`

    fs.readFile(filepath, (err, data) => {
      if (err) return next(err)
      const contentType = mime.getType(filepath)
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(data)
    })
  } else {
    //Якщо URL не відповідає жодного роуту, відправляємо 404 помилку
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.write('404 Сторінку не знайдено')
    res.end()
  }
})

function next(err) {
  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.write('404 Сторінку не знайдено')
  res.end()
}

//Сервер слухає на порту 3000
server.listen(3000, () => {
  console.log('Сервер запущено на http://localhost:3000/')
})
