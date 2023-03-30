/** @format */

/** @format */

const CurrencyExchangeRate = () => {
  console.log("RENDERING");
  const { useReducer, useEffect } = React;

  const initialState = {
    x: "",
    symbolsData: "",
    symbols: "",
    rateData: "",
    currencies: [],
    currencyData: "",
    selectedCurrency: "",
    currencyValue: 0,
    currencyBase: "USD",
    rateUrl: `https://api.exchangerate.host/latest?base=USD&&places=2`,
    symbolsUrl: "https://api.exchangerate.host/symbols",
  };
  //  API DOCUMENTATION FOR THIS URL CAN BE FOUND AT  https://exchangerate.host/#/#docs
  const reducer = (state, action) => {
    switch (action.type) {
      case "FETCH_DATA":
        return {
          ...state,
          rateData: action.payload,
          currencies: Object.keys(action.payload.rates),
          currencyData: action.payload.rates,
        };
      case "CHANGE_CURRENCY":
        const currencyValue = state.currencyData[action.payload];
        return {
          ...state,
          selectedCurrency: action.payload,
          currencyValue,
        };
      case "CHANGE_URL":
        return {
          ...state,
          url: newUrl,
        };
      case " SET_CURRENCY_SYMBOLS":
        return {
          ...state,
          symbolsData: action.payload,
          symbols: Object.keys(action.payload.symbols),
          x: action.payload.symbols,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getdata = () => {
    console.log("Fetching data...");
    const urls = [state.symbolsUrl, state.rateUrl];
    let arr = []; // will use it as transit to hold data retrieved to set all states.

    const requests = urls.map((url) => axios.get(url)); // returns an array of promises
    axios.all(requests);

    axios
      .all(requests)
      .then((responses) => responses.map((res) => res.data)) // extract data from each response
      .then((data) => {
        dispatch({ type: "FETCH_DATA", payload: data[1] });
        state.symbolsData = data[0];
        state.symbols = data[0].symbols;

        console.log(state.symbols.AED.description);
      })
      .catch((error) => {
        console.error(error);
        console.log("wald le7ram");
      });
  };
  useEffect(() => {
    getdata();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const x = e.target.value;
    dispatch({ type: "CHANGE_CURRENCY", payload: x });
  };

  return (
    <div className="container-fluid">
      <h1 className=" p-2 ">Currency Exchange Rates</h1>
      <div className="row p-2 ">
        <div className="col text-head">
          <label className=" p-2 " htmlFor=" currecySelect">
            Select Currency
          </label>
          <select
            id="currecySelect"
            className="form-select p-2 border bg-ligh"
            aria-label="Default select example"
            onChange={(e) => handleChange(e)}
          >
            <option className="form-select p-2 "></option>
            {state.currencies.map((currency) => (
              <option key={currency} value={currency}>
                {state.rateData && currency}
              </option>
            ))}
          </select>
          <br></br>
          {/* display 1 US CONVERSION */}
          <h1 className="Display-6 bg-info p-3 ">
            1 {state.currencyBase} =
            {state.selectedCurrency
              ? `${state.currencyValue} ${state.selectedCurrency} ${
                  state.symbols[state.selectedCurrency].description
                }`
              : null}
          </h1>
        </div>
      </div>
      {/* list of currencies info */}
      <div className="row p-2 ">
        <div className="col-6">
          <ul className="list-group">
            {Object.keys(state.symbols).map((item) => (
              <li className="list-group-item" key={item}>
                <p>
                  {state.symbols[item].description} :{item} :{" "}
                  {state.currencyData[item]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root1"));
root.render(<CurrencyExchangeRate />);
