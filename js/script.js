
'use strict';
// Handlebars templates
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
};

// Const

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  dataTags: 'data-tags',
  articleAuthorSelector: '.post-author',
  
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  dataAuthors: 'data-author',
  authorsListSelector: '.author.list',
};

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
  console.log('href link is: ', hrefLink);

  const idArticle = document.querySelector(hrefLink);
  console.log(idArticle);

  idArticle.classList.add('active');
};
  
function generateTitleLinks(customSelector = '') {
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';
  console.log(customSelector);
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);

  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    //const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
    //console.log('handle html', html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
 
//Tags Cloud: Wyświetlenie listy tagów

function calculateTagsParams(tags){
  const params = {max: 0, min: 999999};
  for(let tag in tags){
    //console.log(tag + ' was used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if (tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
 
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const averageTagCount = params.max - params.min;
  const percentageClassValue = normalizedCount / averageTagCount;
  const classNumber = Math.round(percentageClassValue * (opts.cloudClassCount -1) + 1);
  return opts.cloudClassPrefix + classNumber;
}
  
function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(opts.articleSelector);
  
  for(let article of articles) {
    const tagsWrapper = article.querySelector(opts.articleTagsSelector);
    tagsWrapper.innerHTML ='';
    let html = '';
    const articleTags = article.getAttribute(opts.dataTags);
    const articleTagsArray = articleTags.split(' ');
    for(let tag of articleTagsArray) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html = html + linkHTML;
      if(!allTags[tag]) {
        allTags[tag] = 1;
      } 
      else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;
  //  console.log('linki html: ', tagsWrapper.innerHTML);
  }
  
  const tagsWrapper = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';
  for(let tag in allTags){
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag],tagsParams) + '">' + tag + '(' + allTags[tag] + ')' + '</a></li>';
  }
  tagsWrapper.innerHTML = allTagsHTML;
}
generateTags();

function addClickListenersToTags() {
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
  for (let linkTag of linkTags) {
    linkTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Tag was cliked!', clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log('href tag; ', href);
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

// Article Authors
  
function generateAuthors() {
  const articles = document.querySelectorAll(opts.articleSelector);
  for(let article of articles) {
    const authorWrapper = article.querySelector(opts.articleAuthorSelector);
    authorWrapper.innerHTML = '';
    let html = '';
    const authorTag = article.getAttribute('data-author');
    const linkAuthorHTML = '<a href="#author-' + authorTag + '">by ' + authorTag + '</a>'; 
    html = linkAuthorHTML;
    authorWrapper.innerHTML = html;    
  }
}
generateAuthors();

/* function calculateAuthorParams(authors){
    const paramsAuthor = {max: 0, min: 999999};
    for(let author in paramsAuthor){
      console.log(author + ' was used ' + authors[author] + ' times');
      if(authors[author] > paramsAuthor.max){
        paramsAuthor.max = authors[author];
      }
      if (authors[author] < paramsAuthor.min){
        paramsAuthor.min = authors[author];
      }
    }
    return paramsAuthor;
  }

  function generateListAuthors() {
    let authors = {};
    const articles = document.querySelectorAll(opts.articleSelector);
    
    for(let article of articles) {
      const authorsWrapper = article.querySelector(opts.authorsListSelector);
      authorsWrapper.innerHTML ='';
      let html = '';
      const articleAuthor = article.getAttribute(opts.dataAuthors);
        const linkHTML = '<a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a>';
        html = linkHTML;
        if(!authors[articleAuthor]) {
          authors[articleAuthor] = 1;
        } 
        else {
          authors[articleAuthor]++;
        }
      authorsWrapper.innerHTML = html;
    }
   /*   console.log('author html: ', authorsWrapper.innerHTML);
      const authorWrapper = document.querySelector('.author');
      const paramsAuthor = calculateAuthorParams(authors);
      let authorsHTML = '';
      for(let author in authors){
      authorsHTML += '<li><a href="#author-' + author + '">' + author + '(' + authors[author] + ')' + '</a></li>';
     }
     authorWrapper.innerHTML = authorsHTML;*/
/*  }
  generateListAuthors();*/

function authorClickHandler(event) {

  event.preventDefault();
  const clickedElement = this;
  console.log('Author was cliked!', clickedElement);
  const href = clickedElement.getAttribute('href');
  console.log('Author tags href; ', href);
  const author = href.replace('#author-', '');
  console.log(author);
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
  console.log('All active authors: ', activeAuthors);
  for (let activeAutor of activeAuthors) {
    activeAutor.classList.remove('active');
  }
  const hrefAuthors = document.querySelectorAll('a[href="' + href + '"]');
  for (let hrefAuthor of hrefAuthors) {
    hrefAuthor.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenerToAuthors () {
  const linkAuthors = document.querySelectorAll('.post-author a[href^="#author-"]');
  for(let linkAuthor of linkAuthors) {
    linkAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenerToAuthors();