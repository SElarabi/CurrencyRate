/** @format */
// 'https://api.exchangerate.host/latest';

const Test = () => {
  const { useState, useEffect } = React;
  const [currenciesData, setCurrenciesData] = useState(null);
  const [url, setUrl] = React.useState(" https://api.exchangerate.host/latest");
  //const url = "https://api.exchangerate.host/latest";

  console.log("re-rendered");

  const listData = () => {
    console.log(currenciesData);
    // setUrl("https://api.exchangerate.host/latest");
  };

  useEffect(() => {
    console.log("Fetching data...");
    try {
      const fetchData = async () => {
        const result = await axios(url);
        setCurrenciesData(result.data);
      };

      fetchData();
    } catch {
      (err) => console.log(err);
    }
  }, [url]);

  console.log("daz men hna");

  return (
    <div className="container-fluid">
      <h1> TESTING </h1>
      <button id="listData" onClick={(e) => listData(e)}>
        List Data
      </button>
    </div>
  );
};
ReactDOM.render(<Test />, document.getElementById("root2"));
