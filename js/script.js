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

// Const

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  dataTags = "data-tags",
  optArticleAuthorSelector = '.post-author';
  //const optTagsSelector = '.tags.list'; sprawdzić przy tagsWrapper.
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-';
  
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
    const articleTag = article.getAttribute(dataTags);
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

  
  function generateAuthors() {
    /* [DONE] find all articles with author*/
    const articles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for every article: */
    for(let article of articles) {
      /* [DONE] find author in wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      /* [DONE]  make html variable with empty string */
      authorWrapper.innerHTML='';
      let html = '';
      /* [DONE] get tags from data-author attribute */
      const authorTag = article.getAttribute('data-author');
      /* [DONE] insert HTML author name to all article into the tags wrapper */
      const linkAuthorHTML = '<a href="#author-' + authorTag + '">' + authorTag + '</a>'; 
      html = linkAuthorHTML;
      authorWrapper.innerHTML = html;
      console.log(html);
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
    console.log('Active aurhor: ', hrefAuthor);
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

//Tags Cloud

const calculateTagsParams = function (tags)

function generateTags() {
  
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles) {
    /* find tags wrapper */
  const tagsWrapper = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
  let html = '';
    /* get tags from data-tags attribute */
  const articleTags = article.getAttribute(dataTags);
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
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
  
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

    /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
   /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '(' + allTags[tag] + ')' + '</a></li>';
   }
   /* [NEW] END LOOP: for each tag in allTags: */

   /*[NEW] add HTML from allTagsHTML to tagList */
   tagList.innerHTML = allTagsHTML;
    
  }
}
generateTags();
/* Don't forget delete html code !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/