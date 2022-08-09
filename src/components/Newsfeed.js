import {useEffect, useState} from "react"
import axios from "axios"
import console from "console-browserify"
import XMLParser from "react-xml-parser"

const  Newsfeed = () => {
	const [articles, setArticles] = useState([])

	useEffect(() => {
		axios.get("https://decrypt.co/feed", {
			"Content-Type": "application/xml; charset=utf-8"
		})
		.then(function(response) {
			var xml = new XMLParser().parseFromString(response.data);
			let item = xml.getElementsByTagName('item')

			for (let i = 0; i < item.length; i++) {
				let article = {
					title: item[i].children[0].value,
					link: item[i].children[1].value,
					description: item[i].children[3].value,
					image: {
						url: item[i].children[6].attributes.url,
						height: item[i].children[6].attributes.height/4,
						width: item[i].children[6].attributes.width/2
					} 
				}
				
				setArticles(prevState => {
					return [...prevState, article]
				})
			}
			
		})
		
	}, [])
	
	const latestArticles = articles.slice(0,3)
	console.log("🔋 NewsFeed loaded")
    return (
      <div className="news-feed">
        <h2>NewsFeed</h2>
		{latestArticles.map((article, _index) => (
			<div key={_index}>
				<a href={article.link} target="_blank" rel="noreferrer">
					<h4>{article.title}</h4>
					<img src={article.image.url} alt={article.title}></img>
					<p>{article.description}</p>
				</a>
			</div>

		))}
      </div>
    )
}

export default Newsfeed
  