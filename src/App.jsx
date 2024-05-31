import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import FilterOptions from './components/FilterOptions';
import ArticleList from './components/ArticleList';
import fetchArticles from './services/fetchArticles';

const App = () => {
    const [articles, setArticles] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        source: '',
        date: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchArticles('', filters);
            const combinedArticles = combineArticles(data);
            setArticles(combinedArticles);
        };

        fetchData();
    }, [filters]);

    const combineArticles = (data) => {
        return [
            ...data.newsArticles,
            ...data.guardianArticles,
            ...data.nytimesArticles
        ];
    };

    const handleSearch = async (query) => {
        const data = await fetchArticles(query, filters);
        const combinedArticles = combineArticles(data);
        setArticles(combinedArticles);
    };

    const handleFilterChange = (name, value) => {
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen w-full">
                <Header />
                <main className="flex-grow w-full container mx-auto p-4">
                    <SearchBar onSearch={handleSearch} />
                    <FilterOptions filters={filters} onChange={handleFilterChange} />
                    <ArticleList articles={articles} />
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
