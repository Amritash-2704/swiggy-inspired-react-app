import { useState } from 'react';

const User = () => {
  const [count, setCount] = useState(0);
  const [count2] = useState(1);

  const handleChange = () => {
    const add = count + 1;
    setCount(add);
  };
  return (
    <div className="user">
      <div className="about-user">
        <h1>Count = {count}</h1>
        <h1>Count-2 = {count2}</h1>
        <h2>Name: Amritash</h2>
        <h3>Location: Bhopal</h3>
        <h4>Contact: @Atuld6361</h4>
      </div>
      {/* <button onClick={() => setCount(count + 1)}>Add +</button> */}
      <button onClick={handleChange}>Add +</button>
    </div>
  );
};

export default User;
