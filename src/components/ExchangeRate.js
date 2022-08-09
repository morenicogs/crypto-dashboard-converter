
const  ExchangeRate = ({rate, from, to, result, amount}) => {
    return (
      <div className="exchange-rate">
        <h3>Exchange Rate:</h3>
		<h1>{rate}</h1>
		<p>{amount} {from} = {result} {to}</p>
      </div>
    )
}

export default ExchangeRate
  