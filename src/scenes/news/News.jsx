import './News.css'
import { useState, useEffect } from "react";
import useInterval from "../../utils/useInterval";


function News(props) { 
    console.log("Käynnistetään uutiskomponentti."); // tarkistustulostus
    const [news, setNews] = useState(null); 
    const url = props.url;


    function getNews() {
        console.log("Haetaan uutisia osoitteesta." + url); // Tämä pois lopuksi. 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setNews(data.data?.[0] || null);
            }) 
            .catch(error => console.error("Virhe haettaessa uutisia:", error));
    }
    
    useInterval(getNews, 900000); 
    useEffect(getNews, []); 

    // Formats the date 
    const formatDate = news?.published_at 
        ? new Intl.DateTimeFormat('en-FI', { dateStyle : 'full' }).format(new Date(news.published_at))
        : "Date unavailable";

    return news ? ( 
        <div className="scene_news">
            <div className="article">
                <div className='article_image'>
                    <img src={news.image_url} alt={news.title}/>
                </div>
                <div className='article_content'>
                    
                    <div className='article_title'>
                        <h1>{news.title}</h1>
                    </div>
                    <div className='article_description'>
                        <p>{news.description}</p>
                    </div>
                    <div className='article_date'>
                        <p>{formatDate}</p>
                    </div>
                    <div className='article_source'>
                        <p>{news.source}</p>
                    </div>
                </div>
            </div>
        </div>
    ) : (
      <p>Loading news...</p>
    );
}

export default News;


