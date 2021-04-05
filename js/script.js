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

function generateTitleLinks() {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
    
  const articles = document.querySelectorAll(optArticleSelector);

  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /*console.log('Article title',articleTitle);*/
    const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
    html = html + linkHTML;
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  /*console.log('Linki do artykułów: ', links);*/
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();
 
function generateTags() {
  
  const articles = document.querySelectorAll(optArticleSelector);
  /*console.log('Znalezione artykuły', articles);*/
  for (let article of articles) {
    /*const articleId = article.getAttribute('id');*/
    /*console.log('Id artykułu: ', articleId);*/
    
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
    /*console.log(tagList);*/

  }
}
generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag was cliked!', clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const hrefTag = clickedElement.getAttribute('href');
  console.log('href tagu; ', hrefTag);
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = hrefTag.replace('#tag-', '');
  console.log(tag);
  /* [DONE] find all tag links with class active */
  const activeTags = document.querySelectorAll('.list a.active');
  
  /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
  
      /* remove class active */
      activeTag.classList.remove('active');
    }
  /* END LOOP: for each active tag link */
  clickedElement.classList.add('active'); /* nie wiem czy ten element ma być w tym miejscu, do sprawdzenia */
  /* find all tag links with "href" attribute equal to the "href" constant */
  /*const selectorTags = document.querySelectorAll('.tags a.active[href^="#tag-"]');
  console.log('Selektor: ', selectorTags);*/
  /* START LOOP: for each found tag link */
  /*for (let selectorTag of selectorTags) {*/
  /* add class active */
  /*  selectorTag.classList.add('active');
  }*/
  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const linkTags = document.querySelectorAll('.tags a');
  /*console.log('linki do artykułów: ', linkTags);*/

  /* [DONE] START LOOP: for each link */

  /* [DONE] add tagClickHandler as event listener for that link */
  for (let linkTag of linkTags) {
      linkTag.addEventListener('click', tagClickHandler);
      }
  /* END LOOP: for each link */
  }

addClickListenersToTags();

/* Don't forget to delete things from index.html file */