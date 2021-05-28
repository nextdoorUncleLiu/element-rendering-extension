chrome.runtime.onMessage.addListener(function(request) {
  const { type } = request
  if (type === 'performanceTree') {
    self.postMessage(request)
  }
  window.addEventListener('message', msg => {
    chrome.tabs.query({active: true, currentWindow: true}, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        data: msg.data
      })
    })
  })
})