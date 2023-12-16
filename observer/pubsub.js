const channels = () => {
  const channels = {}

  const subscribe = (channelName, callback) => {
    const currentCallbacks = channels[channelName] || []
    currentCallbacks.push(callback)
    channels[channelName] = currentCallbacks
  }

  const publish = (channelName, message) => {
    if (channels[channelName]) {
      channels[channelName].forEach(fn => fn(message));
    }
  }

  const unsubscribe = (channelName) => {
    if (!channels[channelName]) {
      return;
    }

    delete channels[channelName];
  }

  return {
    publish,
    subscribe,
    unsubscribe,
    emit: () => console.log('hsakdjyeiq')
  }
}

// const socket = channels()

// socket.subscribe('futebol', message => {
//   console.log('juiz', message)
// })

// socket.subscribe('futebol', message => {
//   console.log('técnico', message)
// })

// socket.publish('futebol', {
//   message: 'time a fez gol'
// })


const five = 5;
if (five + 5 !== 10) {
	// do stuff
  console.log('aaaa')
}
