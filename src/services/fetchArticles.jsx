import axios from 'axios';

const API_KEYS = {
    newsApi: '0477d88e27fb4af7bd6ae8c0bcefdd8a',
    guardian: 'f61df7f6-8043-4e4f-9d52-c42a79f45451',
    nytimes: 'QPpyyr3WAJMEyZm0n5Ggk0hTvAaEaGut',
};

const fetchArticles = async (query, filters) => {
    try {
        let newsPromise = null;
        let guardianPromise = null;
        let nytimesPromise = null;

        // Check if a specific source is selected
        if (filters.source === 'newsOrg') {
            newsPromise = fetchNewsArticles(query, filters);
        } else if (filters.source === 'nytimes') {
            nytimesPromise = fetchNytimesArticles(query, filters);
        } else if (filters.source === 'guardian') {
            guardianPromise = fetchGuardianArticles(query, filters);
        } else {
            newsPromise = fetchNewsArticles(query, filters);
            guardianPromise = fetchGuardianArticles(query, filters);
            nytimesPromise = fetchNytimesArticles(query, filters);
        }

        // Wait for all promises to resolve
        const [newsResponse, guardianResponse, nytimesResponse] = await Promise.all([
            newsPromise,
            guardianPromise,
            nytimesPromise
        ]);

        // Normalize responses
        const normalizedGuardianArticles = guardianResponse ? normalizeGuardianData(guardianResponse.data.response.results) : [];
        const normalizedNytimesArticles = nytimesResponse ? normalizeNytimesData(nytimesResponse.data.response.docs) : [];

        return {
            newsArticles: newsResponse ? newsResponse.data.articles : [],
            guardianArticles: normalizedGuardianArticles,
            nytimesArticles: normalizedNytimesArticles
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw new Error('Failed to fetch articles. Please try again later.');
    }
};

// Fetch articles from News API
const fetchNewsArticles = async (query, filters) => {
    const params = new URLSearchParams({
        q: query,
        apiKey: API_KEYS.newsApi,
        ...(filters.category && { category: filters.category }),
        ...(filters.date && { from: filters.date }),
    });

    return axios.get(`https://newsapi.org/v2/top-headlines?country=us&${params.toString()}`);
};

// Fetch articles from Guardian API
const fetchGuardianArticles = async (query, filters) => {
    const params = new URLSearchParams({
        q: query,
        'api-key': API_KEYS.guardian,
        'show-tags': 'contributor',
        'show-fields': 'headline,thumbnail,trailText',
        ...(filters.category && { section: filters.category }),
        ...(filters.date && { 'from-date': filters.date }),
    });

    return axios.get(`https://content.guardianapis.com/search?${params.toString()}`);
};

// Fetch articles from NYTimes API
const fetchNytimesArticles = async (query, filters) => {
    const params = new URLSearchParams({
        q: query,
        'api-key': API_KEYS.nytimes,
        ...(filters.category && { section: filters.category }),
        ...(filters.date && { begin_date: filters.date }),
    });

    return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${params.toString()}`);
};

const normalizeGuardianData = (articles) => {
    return articles.map(article => ({
        title: article.webTitle,
        description: article.fields.trailText,
        url: article.webUrl,
        urlToImage: article.fields.thumbnail,
        source: 'The Guardian',
    }));
};

const normalizeNytimesData = (articles) => {
    return articles.map(article => ({
        title: article.headline.main,
        description: article.abstract,
        url: article.web_url,
        urlToImage: article.multimedia?.length ? `https://www.nytimes.com/${article.multimedia[0].url}` : '',
        source: 'The New York Times',
    }));
};

export default fetchArticles;
