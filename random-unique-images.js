let images = new Set()

let count = 0
do {
  console.log(`Pegando ${++count}`)

  let { url } = await fetch("https://random.imagecdn.app/500/500")
  images.add(url)
} while (images.size < 10)


const imagesContainer = document.createElement('div')

Array.from(images).forEach(img => {
  const image = document.createElement('img')
  image.src = img
  imagesContainer.appendChild(image);
  console.log(img)
})

document.body.appendChild(imagesContainer);


// local.on('exit', () => {
//   console.log('exiting repl...')
// })

// process.argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });