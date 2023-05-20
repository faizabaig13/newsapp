import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [latestArticle, setLatestArticle] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=4ea0b5b773074658b628bcf8545614b2'
      );
      const data = await response.json();
      setArticles(data.articles);
      setLatestArticle(data.articles[0]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>News App</title>
      </Head>

      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center my-8">Latest News</h1>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {latestArticle && (
              <div className="mb-8">
                <Link href={`/news/${latestArticle.id}`}>
                  <a>
                    <img
                      src={latestArticle.urlToImage}
                      alt={latestArticle.title}
                      className="w-full h-64 object-cover rounded shadow-lg"
                    />
                    <h2 className="text-2xl font-bold mt-2">
                      {latestArticle.title}
                    </h2>
                    <p>{latestArticle.content}</p>
                  </a>
                </Link>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded shadow p-4 hover:shadow-lg"
                >
                  <Link href={`/news/${article.id}`}>
                    <a>
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-48 object-cover rounded mb-4"
                      />
                      <h2 className="text-lg font-bold">{article.title}</h2>
                      <p className="text-gray-500">{article.description}</p>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
