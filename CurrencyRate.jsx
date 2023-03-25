/** @format */

const CurrencyExchangeRate = () => {
  const { useState, useEffect } = React;

  const [currData, setCurrData] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [currencyData, setCurrencyData] = useState("");
  const [selCurrency, setSelCurrency] = useState("");
  const [currencyValue, setCurrencyValue] = useState(0);
  const [currencyBase, setCurrencyBase] = useState("USD");
  const [url, setUrl] = useState(
    `https://api.exchangerate.host/latest?base=${currencyBase}&&places=2`
  );

  //  API DOCUMENTATION FOR THIS URL CAN BE FOUND AT  https://exchangerate.host/#/#docs

  const getdata = () => {
    console.log("Fetching data...");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCurrData(data);
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
    getdata(1);
  }, [url]);

  const handleChange = (e) => {
    e.preventDefault();
    const x = e.target.value;
    setSelCurrency(x);
    console.log("Selected currency:", e.target.value);
    setCurrencyValue(currencyData[x]);
    console.log(currencyData[x]);
  };

  console.log("Component rendered");

  return (
    <div className="container-fluid">
      <h1 className=" p-3 border bg-ligh">Currency Exchange Rates</h1>
      <div className="row p-3 border bg-ligh">
        <div className="col">
          <label className=" p-2 border bg-ligh" htmlFor=" currecySelect">
            Select Currency
          </label>
          <select
            id="currecySelect"
            className="form-select p-2 border bg-ligh"
            aria-label="Default select example"
            onChange={(e) => handleChange(e)}
          >
            <option className="form-select p-2 border bg-ligh"></option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currData && currency}
              </option>
            ))}
          </select>
          <br></br>
          <h1 className="Display-6 bg-info p-3 border bg-ligh">
            1 {currencyBase} =
            {selCurrency ? `${currencyValue} ${selCurrency}` : null}
          </h1>
        </div>
      </div>
      {/* list of currencies, exchange rate to current base */}
      <div className="row p-3 border bg-ligh">
        <div className="col">
          <ul className="list-group">
            {currencies.map((currency) => (
              <li className="list-group-item" key={currency} value={currency}>
                <p>
                  {currencyData[currency]} {currency}
                </p>
              </li>
            ))}

            <li className="list-group-item">And a fifth one</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<CurrencyExchangeRate />, document.getElementById("root1"));
