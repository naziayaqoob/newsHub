import React from 'react';

const ArticleList = ({ articles }) => {
    if (articles.length === 0) {
        return <div className="p-4 text-center mt-3">No articles found.</div>;
    }

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article) => (
                <div key={article.url} className="p-4 border rounded shadow-md">
                    <div className="relative overflow-hidden" style={{ height: '200px' }}>
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-bold">{article.title}</h2>
                    <p className="text-gray-700">{article.description}</p>
                    <a href={article.url} className="text-blue-500 hover:underline">Read more</a>
                </div>
            ))}
        </div>
    );
};

export default ArticleList;
