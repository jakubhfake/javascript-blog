'use strict';
// Handlebars templates
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  articleTag: Handlebars.compile(document.querySelector('#template-article-tag').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  articleAuthorLink: Handlebars.compile(document.querySelector('#tempate-article-author').innerHTML),
  authorList: Handlebars.compile(document.querySelector('#template-author-list').innerHTML),
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
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html = html + linkHTML;
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
// Generate tags in articles
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
      const tagHTMLData = {tag: tag};
      const tagHTML = templates.articleTag(tagHTMLData);
      html = html + tagHTML;
      if(!allTags[tag]) {
        allTags[tag] = 1;
      } 
      else {
        allTags[tag]++;
      }
      tagsWrapper.innerHTML = html;
    }
  }
  // Generate tags list in aside 
  const tagsList = document.querySelector('.tags'),
    tagsParams = calculateTagsParams(allTags);
  tagsList.innerHTML = '';

  const allTagsData = {tags: []};
  for(let tag in allTags){
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }
  tagsList.innerHTML = templates.tagCloudLink(allTagsData);
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
function generateListAuthors() {
  let authors = {};
  const articles = document.querySelectorAll(opts.articleSelector);
  for(let article of articles) {
    const authorsWrapper = article.querySelector(opts.articleAuthorSelector);
    authorsWrapper.innerHTML ='';
    let html = '';
    const articleAuthor = article.getAttribute(opts.dataAuthors);
    const authorHTMLData = {author: articleAuthor};
    const authorHTML = templates.articleAuthorLink(authorHTMLData);     
    html = authorHTML;
    if(!authors[articleAuthor]) {
      authors[articleAuthor] = 1;
    } 
    else {
      authors[articleAuthor]++;
    }
    authorsWrapper.innerHTML = html;
  }
  // Generate authors list in aside
  const authorsWrapper = document.querySelector('.authors');
  authorsWrapper.innerHTML ='';
  const allAuthorsData = {authors: []};
  for(let author in authors){
    allAuthorsData.authors.push({
      author: author,
      articleQuantity: authors[author],
    });
}
  authorsWrapper.innerHTML = templates.authorList(allAuthorsData);
}
generateListAuthors();

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
  const linkAuthors = document.querySelectorAll('a[href^="#author-"]');
  for(let linkAuthor of linkAuthors) {
    linkAuthor.addEventListener('click', authorClickHandler);
  }
}
addClickListenerToAuthors();