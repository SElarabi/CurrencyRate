const CryptoExchange = () => {
  const { useState, useEffect } = React;
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('https://api.exchangerate.host/latest');
  const [query, setQuery] = useState('');
  const [selectedKey, setSelectedKey] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  
  const handleSelectChange = (event) => {
    const selectedKey = event.target.key;
    console.log(event);
    setSelectedKey(selectedKey);
    const selectedValue = data.find(([key, value]) => key === selectedKey);
    setSelectedValue(selectedValue);
  };

  useEffect(() => {
    console.log('Fetching data...');
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const { rates } = data;
        setData(Object.entries(rates));
        console.log(data);
      })
      .catch(error => console.error(error));
  }, [url]);

  return (
    <div>
      <h1>test</h1>
      <select 
      className="form-select" aria-label="Default select example"
      onChange={handleSelectChange}
      >
        <option >Open this select menu</option>
        {data.map(([key, value]) => (
          <option 
          key={key} 
          value={value}
          
          >{key}</option>
        ))}
      </select>
      
        <div>
          <p>Selected key: {selectedKey}</p>
          <p>Selected value: {selectedValue}</p>
        </div>
      
    </div>
  );
};

ReactDOM.render(<CryptoExchange />, document.getElementById('root'));
