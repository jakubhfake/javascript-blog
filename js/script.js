/* eslint-disable indent */
'use strict';

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  const activeLinks = document.querySelectorAll('.list a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  clickedElement.classList.add('active');

  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const hrefLink = clickedElement.getAttribute('href');
  console.log('href linku to; ', hrefLink);

  const idArticle = document.querySelector(hrefLink);
  console.log(idArticle);

  idArticle.classList.add('active');
};
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';
  
function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  console.log(customSelector);
  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
 
// Article Tags

function generateTags() {
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    const tagList = article.querySelector(optArticleTagsSelector);
    tagList.innerHTML='';
    let html = '';
    const articleTag = article.getAttribute('data-tags');
    const articleTagsArray = articleTag.split(' ');
     
    for(let tag of articleTagsArray){
      const tagLinkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html =  html + tagLinkHTML;
    }
    tagList.innerHTML = html;
  }
}

generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Tag was cliked!', clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log('href tagu; ', href);
  const tag = href.replace('#tag-', '');
  console.log(tag);
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('All active tags: ', activeTags);
  for (let activeTag of activeTags) {
    activeTag.classList.remove('active');
  }

  const hrefTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log('Aktywne Tagi: ', hrefTags);
  for (let hrefTag of hrefTags) {
    hrefTag.classList.add('active');
    console.log('Aktywny tag: ', hrefTag);
  }
generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log('linki do artykułów: ', linkTags);

  for (let linkTag of linkTags) {
    linkTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

// Article Authors
const optArticleAuthorSelector = '.post-author';
  
  function generateAuthors() {
    /* [DONE] find all articles with author*/
    const articles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for every article: */
    for(let article of articles) {
      /* [DONE] find author in wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log('Authors in articles', optArticleTagsSelector);
      /* [DONE]  make html variable with empty string */
      authorWrapper.innerHTML='';
      let html = '';
      /* [DONE] get tags from data-author attribute */
      const authorTag = article.getAttribute('data-author');
      /* [DONE] insert HTML author name to all article into the tags wrapper */
      const linkAuthorHTML = '<a href="#tag-' + authorTag + '">' + authorTag + '</a>'; 
      html = linkAuthorHTML;
      authorWrapper.innerHTML = html;
      console.log(html);
    /* [DONE] END LOOP: for every article: */
    
  }
}
  generateAuthors();

  /*Nie musisz w żaden sposób zmieniać funkcji generateTitleLinks – 
  wystarczy, że w funkcji authorClickHandler wywołasz ją z 
  odpowiednim argumentem. Pamiętaj, że w tym wypadku w selektorze 
  atrybutu użyjesz łącznika = zamiast ~=.*/

function authorClickHandler(event){

  event.preventDefault();
  const clickedElement = this;
  console.log('Author was cliked!', clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log('Author tags href; ', href);
  const author = href.replace('#tag-', '');
  console.log(author);
  const activeAuthors = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('All active tags: ', activeAuthors);
  for (let activeAutor of activeAuthors) {
    activeAutor.classList.remove('active');
  }

  const hrefTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log('Aktywne Tagi: ', hrefTags);
  for (let hrefTag of hrefTags) {
    hrefTag.classList.add('active');
    console.log('Aktywny tag: ', hrefTag);
  }
generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenerToAuthors (){
/* find all links to tags */
const linkAuthors = document.querySelectorAll('a[href^="#tag-"]');
  /* START LOOP: for each link */
  for(let linkAuthor of linkAuthors) {
    /* add tagClickHandler as event listener for that link */
    linkAuthor.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenerToAuthors();