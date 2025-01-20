import React, { useCallback } from "react";

const App = () => {
  const [numbers, setNumbers] = React.useState([1, 2, 3, 4, 5]);

  // recalculate the sum on every render
  const totalSum = React.useMemo(() => {
    console.log("Calculating Sum...");
    return numbers.reduce((sum, num) => sum + num, 0);
  }, [numbers]);

  // recreate the addRandomNumber funcition on every render

  const addRandomNumber = useCallback(() => {
    setNumbers((prevNums) => [...prevNums, Math.floor(Math.random() * 100)]);
  }, []);

  return (
    <div>
      <h1>Un Optimized Parent Logic Calculaiton</h1>
      <p>Total Sum : {totalSum}</p>
      <button onClick={() => console.log("Hi there,", numbers)}>
        Click Me
      </button>
      <button onClick={addRandomNumber}>Add Random Number</button>
      <ChildComponent numbers={numbers} />
    </div>
  );
};

const ChildComponent = React.memo(({ numbers }) => {
  return (
    <div>
      <h2>Number List</h2>
      <ul>
        {numbers.map((num, index) => (
          <li key={index}>{num}</li>
        ))}
      </ul>
    </div>
  );
});

export default App;
