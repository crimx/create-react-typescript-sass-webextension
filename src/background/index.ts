browser.runtime.onMessage.addListener(message => {
  if (message.type === 'GREETING') {
    return new Promise(resolve =>
      setTimeout(() => resolve('Hi! Got your message a second ago.'), 1000)
    )
  }
})
