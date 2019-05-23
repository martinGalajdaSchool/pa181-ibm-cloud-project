const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('ce6cde095cfb4994a84b9332a9e4eb19');

// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them

const getArticles = (category) => {
    return new Promise((resolve, reject) => {
        newsapi.v2.topHeadlines({
            language: 'en',
            country: 'us',
            category
        }).then(response => {
            //console.log(response)
            resolve(response.articles.map(article => ({
                author: article.author,
                title: article.title,
                url: article.title,
                description: article.description
            })));
        });
    });
};

getArticles('business').then((result)=>{
    console.log(result);
});

