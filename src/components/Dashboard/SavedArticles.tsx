import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { getSavedArticles, removeSavedArticle } from '../../utils/savedArticles';
import { Article } from '../../types/news';

export const SavedArticles: React.FC = () => {
  const { user } = useAuth();
  const [savedArticles, setSavedArticles] = React.useState<Article[]>([]);

  React.useEffect(() => {
    if (user) {
      const articles = getSavedArticles(user.email);
      setSavedArticles(articles);
    }
  }, [user]);

  const handleRemoveArticle = (articleUrl: string) => {
    if (user) {
      removeSavedArticle(user.email, articleUrl);
      setSavedArticles(prev => prev.filter(article => article.url !== articleUrl));
    }
  };

  if (!user) {
    return (
      <div className="text-center text-white mt-8">
        Please log in to view your saved articles
      </div>
    );
  }

  if (savedArticles.length === 0) {
    return (
      <div className="w-full px-8 py-8">
        <div className="text-white text-2xl">You haven't saved any articles yet</div>
      </div>
    );
  }

  return (
    <div className="w-full px-8 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Saved Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        {savedArticles.map((article) => (
          <div
            key={article.url}
            className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                {article.title}
              </h3>
              <p className="text-gray-300 mb-4">{article.description}</p>
              <div className="flex justify-between items-center">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Read More
                </a>
                <button
                  onClick={() => handleRemoveArticle(article.url)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 