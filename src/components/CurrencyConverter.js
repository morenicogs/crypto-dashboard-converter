import { useEffect, useState } from "react"
import ExchangeRate from "./ExchangeRate"
import axios from "axios"
import console from "console-browserify"

const CurrencyConverter = () => {
	const [primaryCurrency, setPrimaryCurrency] = useState("ETH")
	const [seconcdaryCurrency, setSecondaryCurrency] = useState("EUR")
	const [amount, setAmount] = useState(1)
	const [exchangeRate, setExchangeRate] = useState(1)
	const [result, setResult] = useState(0)


	const currencies = ["ETH", "BTC", "SOL", "AVAX", "EUR", "MATIC"]
	
	const handleChangePrimary = (asset) => {
		setPrimaryCurrency(asset.target.value)
		console.log("⚡️ Primary currency changed to: " + asset.target.value )
	}
	const handleChangeSecondary = (asset) => {
		setSecondaryCurrency(asset.target.value)
		console.log("⚡️ Secondary currency changed to: " + asset.target.value )
	}

	function changeAmount(event) {
		setAmount(event.target.value)
		console.log("⚡️ Amount changed to: " + event.target.value)
	}
	
	function convert() {
		
		const options = {
			method: 'GET',
			url: 'https://alpha-vantage.p.rapidapi.com/query',
			json: true,
			params: {from_currency: primaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: seconcdaryCurrency},
			headers: {
				'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
				'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
			}
		};

		axios.request(options)
			.then(function (response) {
				let testResponse = response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
				setExchangeRate(testResponse)
				setResult(testResponse*amount)

				console.log("⚡️ Convert function ran")
				console.log("*********************")
				console.log(amount + " " + primaryCurrency + " => " + seconcdaryCurrency)
				console.log("*********************")
				
			})
			.catch(function (error) {
				console.error(error);
			});
	}

	useEffect(() => {
		convert() // eslint-disable-next-line
		console.log("⚡️ useEffect function ran") // eslint-disable-next-line
	}, [amount, primaryCurrency, seconcdaryCurrency])
	return (
		<div className="currency-converter">
			<h1>Currency Converter</h1>

			<div className="input-box">
				<table>
					<tbody>
						<tr>
							<td>
								Primary Currency:
							</td>
							<td>
								<input type="number" name="currency_amount_1" value={amount} onChange={changeAmount} />
							</td>
							<td>
								<select 
									value={primaryCurrency}
									name="currency_option_1"
									className="currency-options"
									onChange={handleChangePrimary}>
								
									{currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
								</select>
							</td>
						</tr>
						<tr>
							<td>
								Secondary Currency:
							</td>
							<td>
								<input type="number" name="currency_amount_2" value={result} disabled={true} />
							</td>
							<td>
								<select value={seconcdaryCurrency} name="currency_option_2" className="currency-options" onChange={handleChangeSecondary}>
									{currencies.map(
											(currency, _index) => (<option key={_index}>{currency}</option>)
										)
									}
								</select>
							</td>
							
						</tr>
					</tbody>
				</table>
				<button id="convert-button" onClick={convert}>Convert</button>
			</div>	
			<ExchangeRate key="exchangerate" rate={exchangeRate} from={primaryCurrency} to={seconcdaryCurrency} result={result} amount={amount} />
		</div>
	)
}

export default CurrencyConverter
