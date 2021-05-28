
chrome.runtime.onMessage.addListener(function(request) {
  const { type, data } = request.data
  if (type === 'selectedElement') {
    createMask(data)
  }
})

function createMask(data) {
  const maskElement = document.querySelector('#mask-element')
  if (maskElement !== null) {
    document.body.removeChild(maskElement)
  }
  const div = document.createElement('div')
  Object.keys(data).map(styleKey => div.style[styleKey] = data[styleKey] + 'px')
  div.style.position = 'absolute'
  div.style.background = 'rgba(109, 187, 220, 0.5)'
  div.style.zIndex = '9999'
  div.id = 'mask-element'
  document.body.appendChild(div)
}

function getElementTreeData(element, elementTreeData, performanceElementTimingObj) {
  let children = element.children
  for (let i = 0; i < children.length; ++i) {
    let childElement = children[i]
    let argObj = {}
    let nodeValue = ''
    let parsePerformanceElementTiming = {}
    if ('elementtiming' in childElement.attributes) {
      nodeValue = childElement.attributes.elementtiming.nodeValue
      argObj['isDisable'] = false
      argObj['key'] = childElement.dataset.mark
      let performanceElementTiming = performanceElementTimingObj[argObj['key']]
      if (performanceElementTiming) {
        parsePerformanceElementTiming = JSON.parse(JSON.stringify(performanceElementTiming))
      }
    } else {
      nodeValue = childElement.nodeName
      // argObj['disabled'] = true
      argObj['key'] = Math.ceil(Math.random() * 100000)
    }
    argObj = Object.assign({}, argObj, parsePerformanceElementTiming, {
      intersectionRect: childElement.getBoundingClientRect()
    })
    if (/(NO)?SCRIPT/.test(nodeValue)) continue
    argObj['children'] = childElement.children.length ? getElementTreeData(childElement, [], performanceElementTimingObj) : []
    argObj['title'] = nodeValue.replace(/-([0-9]*)$/, '')
    elementTreeData.push(argObj)
  }
  return elementTreeData
}

window.onload = function() {
  let elementTreeData = []
  const observer = new PerformanceObserver((list) => {
    let performanceElementTimingObj = {}
    list.getEntries().map(performanceTimingItem => performanceElementTimingObj[performanceTimingItem.element.dataset.mark] = performanceTimingItem)
    chrome.runtime.sendMessage(
      {
        type: 'performanceTree',
        data: getElementTreeData(document.body, elementTreeData, performanceElementTimingObj)
      }
    )
  });
  observer.observe({ entryTypes: ["element"] });
}
