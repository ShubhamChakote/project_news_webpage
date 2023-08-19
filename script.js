const API_KEY = "ad1e408031d64b5ca73b8f250ef41fb2";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , ()=> fetchNews("India") );


function reload(){
    window.location.reload();
}


async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    // fetch is a promise which fetches you news from api , we provide value in fetch() in  url formate of newsapi

    const data = await res.json();
    //this will convert res into json format

    bindData(data.articles);
}

function bindData(articles){

    const cardContainer = document.getElementById("card-container");
    const newsCardsTemplate = document.getElementById("template-news-card");

    cardContainer.innerHTML = ''; // doing this so that before every api call cardscontainer become empty and so that new cards get filled.

   articles.forEach(article =>{

    if(!article.urlToImage) return;
    //here we are not accepting the article without image

    const cardClone = newsCardsTemplate.content.cloneNode(true); 
    // here we are making clone of card which contains all divs inside it 

    fillDataInCard(cardClone,article);

    cardContainer.appendChild(cardClone);
    //here we are adding card to conatiner


   });


}

function fillDataInCard(cardClone,article){

    const newsImage = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-src");
    const newsDescription = cardClone.querySelector("#news-desc");

    newsImage.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDescription.innerHTML=article.description;


    // below we are changing date of artical which is in time-zone formate to US English formate

    const date = new Date(article.publishedAt).toLocaleString('en-US',{
            timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click' , ()=>{
        window.open(article.url , "_blank");
    })



}

let currentSelectedNav = null;

function onNavItemClick(id){
    fetchNews(id);

    let navItem = document.getElementById(id);

    currentSelectedNav?.classList.remove('active');

    currentSelectedNav = navItem;

    currentSelectedNav.classList.add('active');


}

const searchBtn = document.getElementById('searchBtn');
const searchText = document.getElementById("search-Bar");

searchBtn.addEventListener('click',()=>{

    const query = searchText.value;

    if(!query) return;

    fetchNews(query);

    currentSelectedNav?.classList.remove('active');

    currentSelectedNav=null;


})
