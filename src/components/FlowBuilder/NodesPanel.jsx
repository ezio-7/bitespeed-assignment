import React from 'react';

const NodesPanel = ({ onDragStart }) => {
  const nodes = [{ id: 'textNode', type: 'textNode', data: { text: 'Text Node' } }];

  const onDragNodeStart = (event, node) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(node));
    event.dataTransfer.effectAllowed = 'move';
    onDragStart(event, node); // Call the onDragStart function from the FlowBuilder component
  };

  return (
    <aside className="nodes-panel">
      <div className="description">You can drag these nodes to the pane on the right.</div>
      {nodes.map((node) => (
        <div
          key={node.id}
          className="react-flow__node-input"
          onDragStart={(event) => onDragNodeStart(event, node)}
          draggable
        >
          {node.data.text}
        </div>
      ))}
    </aside>
  );
};

export default NodesPanel;