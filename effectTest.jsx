function Timer() {
  const { useState, useEffect } = React;
  const [count, setCount] = useState(0);
  console.log("I M RENDERING");

  const updateCount = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    console.log("I ran USE-EFFECT");
    setTimeout(() => {
      updateCount();
    }, 10000);
  }, []);

  return (
    <>
      {console.log("I M RETURNING")}
      <button onClick={() => updateCount()}>UPDATE COUNT</button>
      <h1>I've rendered {count} times!</h1>
    </>
  );
}

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Timer />);
