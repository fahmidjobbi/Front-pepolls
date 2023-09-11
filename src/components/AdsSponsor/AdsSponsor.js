import React, { useEffect, useState } from 'react';
import './AdsSponsor.css';
import Pestore from '../../images/Pestore.svg';
import Petribe from '../../images/Petribe.svg';
import Tekup from '../../images/Tekup.svg';
import Gift from '../../images/Gift.png';
import { Link } from 'react-router-dom';

const AdsSponsor = (props) => {
  const { link } = props;
  const [ads, setAds] = useState([]);
  const username = localStorage.getItem('username');
  const [newsArticles, setNewsArticles] = useState([]);
  const [randomArticles, setRandomArticles] = useState([]);

  useEffect(() => {
    // Function to fetch the ads
    const fetchAds = () => {
      // Make the API request to fetch the recommended ads
      const queryParams = new URLSearchParams({ username });
      const apiUrl = `http://127.0.0.1:5000/api/v1/auth/ads?${queryParams}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setAds(Array.isArray(data) ? data : []))
        .catch(error => console.error(error));
    }
  
    // Fetch the ads initially
    fetchAds();
  
    // Setup a timer to fetch the ads again after a certain duration
    let refreshCount = 0;
    const refreshLimit = 2; // Limit the number of refreshes
    const refreshInterval = 1 * 40 * 1000; // Refresh every 1 minute
    const intervalId = setInterval(() => {
      if (refreshCount < refreshLimit) {
        fetchAds();
        refreshCount++;
      } else {
        clearInterval(intervalId);
      }
    }, refreshInterval);
  
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [username]);
  
  

  
  useEffect(() => {
    let refreshCount = 0;
    const refreshLimit = 1;
  
    // Function to fetch the news articles
    const fetchNewsArticles = async () => {
      try {
        const apiKey = 'FRZB1bFpFu5oz9ygCUJaXPHXEnvSf2lM'; // tLGkxbX7d5djkbcebekmu5LfKWZSr5Fk Replace with your actual API key
        const interests = localStorage.getItem('user_interests'); // Get the user interests from localStorage
        const interestsArray = interests.split(','); // Convert the interests string to an array of interests
        const articles = [];
        for (let i = 0; i < interestsArray.length; i++) {
          const interest = interestsArray[i].trim();
          if (interest) {
            const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${interest}`;
            const response = await fetch(url);
            const data = await response.json();
            const articlesData = data.response.docs.slice(0, 2); // Retrieve the first two articles
            articles.push(...articlesData);
          }
        }
  
        setNewsArticles(articles);
      } catch (error) {
        console.error(error);
      }
    };
  
    // Fetch the news articles initially
    fetchNewsArticles();
  
    // Setup a timer to fetch the news articles again after a certain duration
    const refreshInterval = 1 * 40 * 1000; // Refresh every 1 minute
    const intervalId = setInterval(() => {
      if (refreshCount < refreshLimit) {
        fetchNewsArticles();
        refreshCount++;
      } else {
        clearInterval(intervalId);
      }
    }, refreshInterval);
  
    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    const getRandomArticles = () => {
      const shuffledArticles = newsArticles.sort(() => 0.5 - Math.random());
      return shuffledArticles.slice(0, 2);
    };
  
    setRandomArticles(getRandomArticles());
  }, [newsArticles]);
  

  return (
    <nav className="ads-sponsor">
      <div className="profil-ads-sponsor">
        <span>Sponsored</span>
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="image-container">
          {ads.map(ad => (
            <Link to={ad.link}>
                <img src={`http://127.0.0.1:5000/api/v1/auth/ads/images/${ad.image}`}  />
                <image-title>{ad.title}</image-title>
            </Link>
            
          ))}

          <Link to="https://tek-up.de/">
            <img src={Tekup} alt="Petribe" />
            <image-title>TEK-UP</image-title>
          </Link>
        </div>
      </a>
      <div class="vc-column-inner wpb-wrraper"></div>
      <div className="profil-ads-sponsor-a-pages">
        <Link to="/Home">
          <a className="a-pages">Your Pages and profiles</a>
        </Link>
      </div>
      <div class="vc-column-inner wpb-wrraper"></div>
      <div className="profil-ads-sponsor">          
        <span>Tunisia News</span>
      </div>
        <div className="space news">
              {randomArticles.length > 0 && (
          <div className="image-container news">
            {randomArticles.map((article, index) => (
              <div key={index} className="image-container">
                <a href={article.web_url} target="_blank" rel="noopener noreferrer">
                  {article.multimedia && article.multimedia.length > 0 && (
                    <img src={`https://www.nytimes.com/${article.multimedia[0].url}`} alt={article.headline.main} />
                  )}
                  <span>{article.headline.main}</span>
                </a>
              </div>
            ))}
          </div>
        )}
        </div>
      <div class="vc-column-inner wpb-wrraper"></div>
      <div className="profil-ads-sponsor">          
        <span>Birthdays</span>
      </div>
      <Link to="/Home">
        <img className="img-gift" src={Gift} alt="Petribe" />
        <image-gift-title>Fahmi and 8 others have birthday today</image-gift-title>
      </Link>
      <div class="vc-column-inner wpb-wrraper"></div>
      <div className="profil-ads-sponsor">
        <span>Contacts</span>
      </div>
      <div class="vc-column-inner wpb-wrraper"></div>
    </nav>
  );
};

export default AdsSponsor;
