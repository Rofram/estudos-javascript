function waitFor(ms, text) {
  return new Promise(resolve => setTimeout(() => {
    console.log(text);
    resolve()
  }, ms));
}

waitFor(1000, 'You\'ll see this after 1 second')
  .then(() => waitFor(1000,'You\'ll see this after 2 seconds'))
  .then(() => waitFor(1000, 'You\'ll see this after 3 seconds'))
  .then(() => waitFor(1000, 'You\'ll see this after 4 seconds'))
  .then(() => waitFor(1000, 'You\'ll see this after 5 seconds'))