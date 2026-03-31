import { useState } from 'react';

const Contact = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Contact</h1>
      <h1>Count: {count}</h1>
      <p>This is contact page,</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Add
      </button>
    </div>
  );
};

export default Contact;
