import { useState, useEffect } from 'react';
import { Tree } from 'antd';
import './App.css';
function App() {
  const [treeData, setTreeData] = useState([]) 
  window.addEventListener('message', msg => {
    const { type, data } = msg.data
    if (type === 'performanceTree') {
      console.log(data)
      setTreeData(data)
    }
  })
  useEffect(() => {}, [treeData])
  return (
    <div className="App">
      <Tree
        showLine
        titleRender={
          nodeData => {
            return (
              <div onClick={() => { selectedElement(nodeData) }}>
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
    str += '暂不支持'
  }
  return str
}

function selectedElement(nodeData) {
  console.log(nodeData)
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

export default App;
