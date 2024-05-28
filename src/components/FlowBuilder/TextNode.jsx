import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';

const TextNode = ({ data }) => {
  const [text, setText] = useState(data.text);

  return (
    <div className="text-node">
      <Handle type="source" position="left" style={{ background: '#555' }} />
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-node-input"
        />
      </div>
      <Handle type="target" position="right" style={{ background: '#555' }} />
    </div>
  );
};

export default TextNode;