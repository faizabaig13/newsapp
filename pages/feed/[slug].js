import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Feed.module.css';

const Feed = ({ articles, pageNumber }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [articles]);

  const handlePreviousPage = () => {
    if (pageNumber > 1) {
      router.push(`/feed/${pageNumber - 1}`);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < 4) {
      setIsLoading(true);
      router.push(`/feed/${pageNumber + 1}`);
    }
  };

  if (!articles) {
    return (
      <div className="page-container">
        <p>Loading articles...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`News App | Feed Page (${pageNumber})`}</title>
      </Head>

      <div className="page-container">
        <div className={styles.main}>
          {isLoading ? (
            <div className={styles.loader}>
              <div className={styles.spinner}></div>
            </div>
          ) : (
            articles.map((article, index) => (
              <div key={index} className={styles.post}>
                <Link href={article.url}>
                  <a target="_blank" rel="noreferrer noopener">
                    {article.title}
                  </a>
                </Link>
                <p>{article.description}</p>
                {/* {article.urlToImage ? (
                  <img src={article.urlToImage} alt={article.title} />
                ) : (
                  <img
                    src="/placeholder-image.jpg" // Replace with your placeholder image URL
                    alt="Placeholder"
                  />
                )} */}
              </div>
            ))
          )}
        </div>

        {/* paginator */}
        <div className={styles.paginator}>
          {/* previous */}
          <div
            onClick={handlePreviousPage}
            className={pageNumber <= 1 ? styles.disabled : styles.active}
          >
            Previous Page
          </div>

          {/* current page */}
          <div>#{pageNumber}</div>

          {/* next */}
          <div
            onClick={handleNextPage}
            className={pageNumber >= 4 ? styles.disabled : styles.active}
          >
            Next Page
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const pageNumber = context.query.slug;
  console.log('Page Number:', pageNumber);

  // if invalid slug....
  if (!pageNumber || pageNumber < 1 || pageNumber > 5) {
    return {
      props: { articles: null, pageNumber: 1 },
    };
  }

  // if valid slug...
  const response = await fetch(
    `https://newsapi.org/v2/top-headlines?country=ng&pageSize=10&page=${pageNumber}&apiKey=4ea0b5b773074658b628bcf8545614b2`
  );
  const data = await response.json();
  console.log('API Response:', data);

  const { articles } = data;

  return {
    props: { articles, pageNumber: Number.parseInt(pageNumber) },
  };
};

export default Feed;

