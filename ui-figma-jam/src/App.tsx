import { ReactFlow, Background, Controls, Node, ConnectionMode, useEdgesState, Connection, addEdge, useNodesState } from '@xyflow/react'
import { zinc } from 'tailwindcss/colors'
import { Square } from './components/nodes/Square'
import { useCallback } from 'react'
import { Losango } from './components/nodes/Losango'
import { DefaultEdge } from './components/edges/DefaultEdge'

const NODE_TYPES = {
  square: Square,
  losango: Losango
}

const EDGE_TYPES = {
  default: DefaultEdge
}

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: { x: 200, y: 400 },
    data: {}
  },
  {
    id: crypto.randomUUID(),
    type: 'square',
    position: { x: 600, y: 400 },
    data: {}
  }
] satisfies Node[]

function App() {
  const [ edges, setEdges, onEdgesChange ] = useEdgesState([])
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES)

  const onConnect = useCallback((connection: Connection) => {
    return setEdges(edges => addEdge(connection, edges))
  }, [])

  return (
    <div className='w-screen h-screen'>
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: 'default'
        }}
      >
        <Background
          gap={12}
          size={2}
          color={zinc[200]}
        />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default App
