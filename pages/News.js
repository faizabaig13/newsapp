
// const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=4ea0b5b773074658b628bcf8545614b2'; // Replace with the actual API endpoint

import { useState, useEffect } from 'react';
import Image from 'next/image';

const NewsApp = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=4ea0b5b773074658b628bcf8545614b2');
        const data = await response.json();
        setArticles(data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Latest News</h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {articles.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              {article.urlToImage && (
                <div className="relative h-48">
                  <Image
                    src={article.urlToImage}
                    alt={article.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              )}
              <h2 className="text-xl font-bold mt-4">{article.title}</h2>
              <p className="text-gray-500 mt-2">{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 mt-4 block">
                Read More
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsApp;
