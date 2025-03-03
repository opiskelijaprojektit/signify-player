import './News.css'
import { useState, useEffect } from "react";
import useInterval from "../../utils/useInterval";

/**
 * News.jsx is a news component that fetches one top news article from The News API 
 * and is rendered on the screen by the Scene component. 
 * 
 * IMPORTANT! In order the API call to work you need to order the API key
 * from https://www.thenewsapi.com/. Then update the "key" value in 
 * server/data.json in the array with the type "news".
 * If you wish to use another news API update the "baseUrl", "key" and 
 * "query" values in the data.json file accordingly. 
 * 
 * @component
 * @author Leena Kevätkylä
 * @since February 2025
 */

function News(props) { 
    const [news, setNews] = useState(null); 
    const url = props.url;

    // Fetches the news via the url that is passed as a prop via the Scene component.
    function getNews() {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setNews(data.data?.[0] || null);
            }) 
            .catch(error => console.error("Error fetching news data:", error));
    }
    
    // Makes the API call and updates the news every 15 minutes, 
    // which is the rough limit for the free plan of The News API (100 request/day).
    useInterval(getNews, 900000); 

    useEffect(() => {
        getNews();
    }, []); 

    // Formats the publication date and time
    const formatDate = news?.published_at 
        ? new Intl.DateTimeFormat('en-FI', { dateStyle : 'full', timeStyle: 'short' }).format(new Date(news.published_at))
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
                        <p>Published: {formatDate}</p>
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


