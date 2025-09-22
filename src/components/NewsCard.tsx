import React from 'react';
import { motion } from 'framer-motion';
import { Article } from '../types/news';
import { useAuth } from '../context/AuthContext';
import { saveArticle, removeSavedArticle, isArticleSaved } from '../utils/savedArticles';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

interface NewsCardProps {
  article: Article;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      setIsSaved(isArticleSaved(user.email, article.url));
    }
  }, [user, article.url]);

  const handleSaveClick = () => {
    if (!user) {
      // You might want to show a login prompt here
      return;
    }

    if (isSaved) {
      removeSavedArticle(user.email, article.url);
      setIsSaved(false);
    } else {
      saveArticle(user.email, article);
      setIsSaved(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm text-blue-400">{article.source.name}</span>
          {user && (
            <button
              onClick={handleSaveClick}
              className="text-white hover:text-blue-400 transition-colors"
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          )}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {article.title}
        </h3>
        <p className="text-gray-300 mb-4">{article.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300"
          >
            Read More
          </a>
        </div>
      </div>
    </motion.div>
  );
}; 