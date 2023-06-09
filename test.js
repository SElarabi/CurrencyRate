/** @format */

const CurrencyExchangeRate = () => {
  console.log("RENDERING");
  const { useReducer, useEffect } = React;

  const initialState = {
    rateData: "",
    currencies: [],
    currencyData: "",
    selectedCurrency: "",
    currencyValue: 0,
    currencyBase: "USD",
    rateUrl: `https://api.exchangerate.host/latest?base=USD&&places=2`,
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

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getdata = (newUrl) => {
    console.log("Fetching data...");
    fetch(newUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "FETCH_DATA", payload: data });
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    const urls = [state.symbolsUrl, state.rateUrl];
    getdata(state.rateUrl);
  }, [state.rateUrl]);

  const handleChange = (e) => {
    e.preventDefault();
    const x = e.target.value;
    dispatch({ type: "CHANGE_CURRENCY", payload: x });
  };

  // symbols
  var requestURL = "https://api.exchangerate.host/symbols";
  var request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    var response = request.response;
    console.log(response);
  };
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
            {state.currencies.map((currency) => (
              <option key={currency} value={currency}>
                {state.rateData && currency}
              </option>
            ))}
          </select>
          <br></br>
          <h1 className="Display-6 bg-info p-3 border bg-ligh">
            1 {state.currencyBase} =
            {state.selectedCurrency
              ? `${state.currencyValue} ${state.selectedCurrency}`
              : null}
          </h1>
        </div>
      </div>
      {/* list of currencies, exchange rate to current base */}
      <div className="row p-3 border bg-ligh">
        <div className="col-4">
          <ul className="list-group">
            {state.currencies.map((currency) => (
              <li className="list-group-item" key={currency} value={currency}>
                <p>
                  {state.currencyData[currency]} {currency}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-8"></div>
      </div>
      {console.log("Component rendered")}
    </div>
  );
};

// const root = ReactDOM.createRoot(document.getElementById("root2"));
// root.render(<CurrencyExchangeRate />);
