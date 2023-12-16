const getSwapiPagerator = (endpoint) => {
  return async function* () {
    let nextUrl = `https://swapi.dev/api/${endpoint}`;
    while (nextUrl) {
      const response = await fetch(nextUrl);
      const data = await response.json();
      nextUrl = data.next;
      yield* data.results;
    }
  };
};

const starWars = {
  characters: {
    [Symbol.asyncIterator]: getSwapiPagerator("people"),
  },
  planets: {
    [Symbol.asyncIterator]: getSwapiPagerator("planets"),
  },
  ships: {
    [Symbol.asyncIterator]: getSwapiPagerator("starships"),
  },
};

async function* getStarShips() {
  const results = [];
  for await (const page of starWars.ships) {
    console.log(page.name);
    results.push(page.name);
    yield results;
  }
}

const ships = getStarShips();

for await (const data of ships) {
  console.log(data);
}
