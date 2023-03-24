const CurrencyExchangeRate = () => {
  const { useState, useEffect } = React;
  const [currencies, setCurrencies] = useState([]);
  const [currencyData, setCurrencyData] = useState("");
  const [currencyValue, setCurrencyValue] = useState(0);
  const [currencyBase, setCurrencyBase] = useState("USD");
  const [url, setUrl] = useState(
    `https://api.exchangerate.host/latest?base=${currencyBase}`
  );

  //  API DOCUMENTATION FOR THIS URL CAN BE FOUND AT  https://exchangerate.host/#/#docs

  const getdata = () => {
    console.log("Fetching data...");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { rates } = data;
        const arr = Object.keys(rates);
        // , Object.values(rates)
        setCurrencyData(rates);
        console.log(data);
        setCurrencies(arr);
        console.log("Data fetched:", arr);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getdata();
  }, [url]);

  const handleChange = (e) => {
    e.preventDefault();
    const x = e.target.value;
    console.log("Selected currency:", e.target.value);
    setCurrencyValue(currencyData[x]);
    console.log(currencyData[x]);
  };

  console.log("Component rendered");

  return (
    <div className="container-fluid">
      <h1>Currency Exchange Rates</h1>
      <div className="row">
        <div className="col">
          select
          <br></br>
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => handleChange(e)}
          >
            <option>Open this select menu</option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          Currency Rate Value in {currencyBase}
          {/* {currencyBase} */}
          <p> {currencyValue}</p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<CurrencyExchangeRate />, document.getElementById("root1"));
