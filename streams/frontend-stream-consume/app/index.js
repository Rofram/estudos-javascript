const API_URL = 'http://localhost:3000'

async function consumeApi(signal) {
  const response = await fetch(API_URL, {
    signal,
  })
  const reader = response.body
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(parserNDJSON())
  return reader;
}

function appendToHTML(element) {
  return new WritableStream({
    write({ name, genres, type }) {
      const card = `
      <article>
        <div class="text">
          <h3>${name}</h3>
          <p>${genres}</p>
          <p>${type}</p>
        </div>
      </article>
      `
      element.innerHTML += card
    }
  })
}

// essa função vai se certificar que caso dois json cheguem em uma única transmissão
// converta corretamente para JSON
// dado: {}\n{}
// esperado:
// {}
// {}
function parserNDJSON() {
  let ndjsonBuffer = '';
  return new TransformStream({
    transform(chunk, controller) {
      ndjsonBuffer += chunk
      const items = ndjsonBuffer.split("\n");
      items.slice(0, -1).forEach(item => {
        controller.enqueue(JSON.parse(item));
      })
      ndjsonBuffer = items[items.length - 1];
    },
    flush(controller) {
      if (!ndjsonBuffer) return;
      controller.enqueue(JSON.parse(ndjsonBuffer));
    }
  })
}

const [
  start,
  stop,
  cards
] = ['start', 'stop', 'cards'].map(item => document.getElementById(item))
let abortController = new AbortController();

start.addEventListener('click', async () => {
  const reader = await consumeApi(abortController.signal);
  reader.pipeTo(appendToHTML(cards))
})
stop.addEventListener("click", async () => {
  abortController.abort();
  alert("aborted!")
  abortController = new AbortController();
})