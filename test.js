const Test = () => {
  var rates = {};
  const listData = () => {
    var requestURL = "https://api.exchangerate.host/latest";
    var request = new XMLHttpRequest();
    request.open("GET", requestURL);
    request.responseType = "json";
    request.send();

    request.onload = function () {
      var response = request.response;
      rates = response.rates;
      console.log(rates.AED);
    };
  };

  return (
    <div className="container-fluid">
      <h1> TESTING </h1>
      <button onClick={listData}>List Data</button>
      <h1>{rates.AED}</h1>
    </div>
  );
};
// ReactDOM.render(<Test />, document.getElementById("root2"));
