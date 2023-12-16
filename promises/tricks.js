//  https://www.builder.io/blog/promises

// Generic function to throw if any errors occured, or return the responses
// if no errors happened
function handleResults(results) {
  const errors = results
    .filter(result => result.status === 'rejected')
    .map(result => result.reason)

  if (errors.length) {
    // Aggregate all errors into one
    throw new AggregateError(errors)
  }

  return results.map(result => result.value)
}

async function getPageData() {
  const results = await Promise.allSettled([
    fetchUser(), fetchProduct()
  ])

  try {
    // Nicer on the eyes
    const [user, product] = handleResults(results)
  } catch (err) {
    for (const error of err.errors) {
      handle(error)
    }
  }
}

// Race to see which Promise completes first
const racePromise = Promise.race([
  doSomethignSlow(),
  new Promise((resolve, reject) =>
    // Time out after 5 seconds
    setTimeout(() => reject(new Error('Timeout')), 5000)
  )
])

try {
  const result = await racePromise
} catch (err) {
  // Timed out!
}

const anyPromise = Promise.any([ 
  getSomethingFromPlaceA(), getSomethingFromPlaceB() 
])

try {
  const winner = await anyPromise
} catch (err) {
  // Darn, both failed
}