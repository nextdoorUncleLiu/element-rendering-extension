import { useState, useEffect } from 'react';
import { Tree } from 'antd';
import './App.css';
function App() {
  const [treeData, setTreeData] = useState([]) 
  window.addEventListener('message', msg => {
    const { type, data } = msg.data
    if (type === 'performanceTree') {
      setTreeData(data)
    }
  })
  useEffect(() => {
  }, [treeData])
  return (
    <div className="App">
      <Tree
        showLine
        titleRender={
          nodeData => {
            return (
              <div onMouseOver={() => { selectedElement(nodeData) }} onMouseOut={cancelElement}>
                {nodeData.title}{updateTime(nodeData)}
              </div>
            )
          }
        }
        treeData={treeData}
      />
    </div>
  );
}

function updateTime(nodeData) {
  let str = ' - '
  if (nodeData.renderTime) {
    str += Math.round(nodeData.renderTime)
  } else {
    str += '该元素下非元素外不存在文本'
  }
  return str
}

function selectedElement(nodeData) {
  console.log('selectedElement')
  if (!nodeData.disabled) {
    postMessage(
      {
        type: 'selectedElement',
        data: nodeData.intersectionRect
      },
      '*'
    )
  }
}

function cancelElement () {
  console.log('cancelElement')
  postMessage(
    {
      type: 'cancelElement'
    },
    '*'
  )
}

export default App;
