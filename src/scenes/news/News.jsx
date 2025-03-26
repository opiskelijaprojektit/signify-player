import './News.css'
import { useState, useEffect } from "react";
import useInterval from "../../utils/useInterval";
import Container from '../../components/container/Container';
import background from './background.jpg';

/**
 * News.jsx is a news component that fetches one top news article from The News API
 * and is rendered on the screen by the Scene component.
 * 
 * IMPORTANT! In order the API call to work you need to order the API key
 * from https://www.thenewsapi.com/. Then update the "key" value in
 * server/data.json in the array with the type "news".
 * If you wish to use another news API update the "baseUrl", "key" and
 * "query" values in the code accordingly.
 * 
 * @component
 * @author Leena Kevätkylä
 * @since February 2025
 */

function News(props) {
    const [news, setNews] = useState(null);
    const baseUrl= "https://api.thenewsapi.com/v1/news/top?api_token=";
    const query = "&limit=1&locale=gb";
    const url = baseUrl + props.apikey + query;

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
        <Container className="scene_news" backgroundImage={background}>
            <div className="article">
                <img className="article_image" src={news.image_url} alt={news.title} />
                <br/>
                <div className='article_title'>
                    <span>{news.title}</span>
                </div>
                <br/>
                <div className='article_description'>
                    <span>{news.description}</span>
                </div>
                <br/>
                <div className='article_date'>
                    <span>Published: {formatDate}</span>
                </div>                    
                <div className='article_source'>
                    <span>{news.source}</span>
                </div>
            </div>
        </Container>
    ) : (
      <p>Loading news...</p>
    );
}

export default News;