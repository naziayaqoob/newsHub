import axios from 'axios';

const fetchArticles = async (query, filters) => {
  try {
    // Define promises for each source
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
      // If no specific source is selected, fetch from all sources
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
  const newsApiKey = '0477d88e27fb4af7bd6ae8c0bcefdd8a';
  const filterParams = new URLSearchParams();
  if (filters.category) filterParams.append('category', filters.category);
  if (filters.date) filterParams.append('from', filters.date);

  return axios.get(`https://newsapi.org/v2/everything?domains=wsj.com&q=${query}${filterParams.toString()}&apiKey=${newsApiKey}`);
};

// Fetch articles from Guardian API
const fetchGuardianArticles = async (query, filters) => {
  const guardianApiKey = 'f61df7f6-8043-4e4f-9d52-c42a79f45451';
  const filterParams = new URLSearchParams();
  if (filters.category) filterParams.append('section', filters.category);
  if (filters.date) filterParams.append('from-date', filters.date);

  return axios.get(`https://content.guardianapis.com/search?q=${query}${filterParams.toString()}&api-key=${guardianApiKey}&show-tags=contributor&show-fields=headline,thumbnail,trailText`);
};

// Fetch articles from NYTimes API
const fetchNytimesArticles = async (query, filters) => {
  const nytimesApiKey = 'QPpyyr3WAJMEyZm0n5Ggk0hTvAaEaGut';
  const filterParams = new URLSearchParams();
  if (filters.category) filterParams.append('section', filters.category);
  if (filters.date) filterParams.append('begin_date', filters.date);

  return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}${filterParams.toString()}&api-key=${nytimesApiKey}`);
};

// Normalize Guardian articles data
const normalizeGuardianData = (articles) => {
  return articles.map(article => ({
    title: article.webTitle,
    description: article.fields.trailText,
    url: article.webUrl,
    urlToImage: article.fields.thumbnail,
    source: 'The Guardian'
  }));
};

// Normalize NYTimes articles data
const normalizeNytimesData = (articles) => {
  return articles.map(article => ({
    title: article.headline.main,
    description: article.abstract,
    url: article.web_url,
    urlToImage: 'https://www.nytimes.com/' + (article.multimedia && article.multimedia.length > 0 ? article.multimedia[0].url : ''),
    source: 'The New York Times'
  }));
};

export default fetchArticles;
