/* eslint-disable indent */
'use strict';

// Const

const opts = {
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  dataTags: 'data-tags',
  articleAuthorSelector: '.post-author',
  tagsSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
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
 
// Tagi w Artykułach

function generateTags() {
  const articles = document.querySelectorAll(opts.articleSelector);
  for (let article of articles) {
    const tagList = article.querySelector(opts.articleTagsSelector);
    tagList.innerHTML='';
    let html = '';
    const articleTag = article.getAttribute(opts.dataTags);
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

//Tags Cloud: Wyświetlenie listy tagów

function calculateTagsParams(tags){
  const params = {max: 0, min: 999999};
  for(let tag in tags){
    console.log(tag + ' was used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if (tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}
//function calculateTagClass, zastanowić się jak zapisać ilość unikalnych tagów 
 
  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
   //console.log('count: ', count, 'params.min: ', params.min);
    //console.log(normalizedCount);
    const averageTagCount = params.max - params.min;
    const percentageClassValue = normalizedCount / averageTagCount;
    const classNumber = Math.round(percentageClassValue * (opts.cloudClassCount -1) + 1);
    //console.log('class number; ', classNumber);
    return opts.cloudClassPrefix + classNumber;
    
  }
  

function generateListTags() {
    /* [NEW] create a new variable allTags with an empty object */
 let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  
  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = document.querySelector(opts.tagsSelector);
    /* make html variable with empty string */
    tagsWrapper.innerHTML ='';
    let html = '';    
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute(opts.dataTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags[tag]) {
        /* [NEW] add generated code to allTags array */
        allTags[tag] = 1;
      } 
      else {
        allTags[tag]++;
      }
 
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    console.log('linki html: ', tagsWrapper.innerHTML);

    /* END LOOP: for every article: */
  }
    /* [NEW] find list of tags in right column */
    const tagsWrapper = document.querySelector('.tags');


    const tagsParams = calculateTagsParams(allTags);
    
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
   /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag],tagsParams) + '">' + tag /*+ '(' + allTags[tag] + ')' */+ '</a></li>';
   }
   /* [NEW] END LOOP: for each tag in allTags: */
   tagsWrapper.innerHTML = allTagsHTML;
   //console.log('allTags[tag] xxx:', allTags, 'tagsParams xxx: ', tagsParams);
   //console.log(tagsWrapper);
}
generateListTags();

// dla czego musiałem przenieść całą chmurę przed addClickListener, 
// czy JS nie powinien odczytać tej funkcji skoro wygenerował tagi przed kliknęciem??
// może to wina jakiegoś zakresu inicjacji funkcji lub querySelectora, 

function addClickListenersToTags() {
  const linkTags = document.querySelectorAll('a[href^="#tag-"]');
  console.log('Links to articles: ', linkTags);

  for (let linkTag of linkTags) {
    linkTag.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTags();

// Article Authors
  
  function generateAuthors() {
    /* [DONE] find all articles with author*/
    const articles = document.querySelectorAll(opts.articleSelector);
    /* [DONE] START LOOP: for every article: */
    for(let article of articles) {
      /* [DONE] find author in wrapper */
      const authorWrapper = article.querySelector(opts.articleAuthorSelector);
      /* [DONE]  make html variable with empty string */
      authorWrapper.innerHTML = '';
      let html = '';
      /* [DONE] get tags from data-author attribute */
      const authorTag = article.getAttribute('data-author');
      /* [DONE] insert HTML author name to all article into the tags wrapper */
      const linkAuthorHTML = '<a href="#author-' + authorTag + '">by ' + authorTag + '</a>'; 
      html = linkAuthorHTML;
      authorWrapper.innerHTML = html;
    /* [DONE] END LOOP: for every article: */
    
  }
}
  generateAuthors();

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
/* find all links to tags */
const linkAuthors = document.querySelectorAll('.post-author a[href^="#author-"]');
  /* START LOOP: for each link */
  for(let linkAuthor of linkAuthors) {
    /* add tagClickHandler as event listener for that link */
    linkAuthor.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenerToAuthors();



/* POmyśleć jak dodać style scss zależnie od ilości klas w JS
/* Don't forget delete html code !!!!!!!*/