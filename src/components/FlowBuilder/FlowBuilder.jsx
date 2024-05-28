import React, { useState, useRef, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Edge,
  ReactFlowProvider,
} from 'react-flow-renderer';
import NodesPanel from './NodesPanel';
import TextNode from './TextNode';
import '../../styles/FlowBuilder.css';

const nodeTypes = {
  textNode: TextNode,
};

const FlowBuilder = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const reactFlowInstance = useRef(null);
  const [isReactFlowReady, setIsReactFlowReady] = useState(false);

  useEffect(() => {
    if (reactFlowInstance.current !== null && !isReactFlowReady) {
      const isProjectAvailable = reactFlowInstance.current.project !== undefined;
      setIsReactFlowReady(isProjectAvailable);
    }
  }, [reactFlowInstance, isReactFlowReady]);

  const onDragStart = (event, node) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    if (isReactFlowReady && event.dataTransfer.getData('application/reactflow')) {
      const nodeType = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const position = reactFlowInstance.current.project({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: `${nodeType.type}-${nodes.length + 1}`,
        type: nodeType.type,
        position,
        data: nodeType.data,
      };

      setNodes((prevNodes) => [...prevNodes, newNode]);
    }
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const addEdge = (params, eds) => {
    const newEdge = {
      id: `edge-${eds.length + 1}`,
      source: params.source,
      target: params.target,
    };
    return [...eds, newEdge];
  };

  const handleSave = () => {
    const nodesWithEmptyTargets = nodes.filter((node) => !node.data.text && node.handlePosition === 'target');
    if (nodesWithEmptyTargets.length > 1) {
      alert('Please fill in the text for all target nodes.');
    } else {
      console.log('Flow saved:', { nodes, edges });
    }
  };

  return (
    <div className="flow-builder">
      <ReactFlowProvider>
        <NodesPanel onDragStart={onDragStart} />
        <div className="react-flow-container">
          <ReactFlow
            ref={reactFlowInstance}
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        <button onClick={handleSave} className="save-button">
          Save
        </button>
      </ReactFlowProvider>
    </div>
  );
};

export default FlowBuilder;