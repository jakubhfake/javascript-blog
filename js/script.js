"use strict";
{
  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log("Link was clicked!");

    const activeLinks = document.querySelectorAll(".titles a.active");
    for (let activeLink of activeLinks) {
      activeLink.classList.remove("active");
    }

    clickedElement.classList.add("active");

    const activeArticles = document.querySelectorAll(".posts article.active");
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove("active");
    }

    const hrefLink = clickedElement.getAttribute("href");
    console.log("href linku to; ", hrefLink);

    const idArticle = document.querySelector(hrefLink);
    console.log(idArticle);

    idArticle.classList.add("active");
  };

  const links = document.querySelectorAll(".titles a");

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

  function generateTitleLinks() {
    /* [DONE] delete list of links from left aside */
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    console.log(titleList);
    function clearMessage() {
      titleList.innerHTML = "";
    }
    clearMessage();
    /*for all articles: */

    const articles = document.querySelectorAll(optArticleSelector);
    for (let article of articles) {
      /* [DONE] read article id na save it in to the const */
      /* get the article id */
      const articleId = article.getAttribute("id");
      console.log(articleId);
      /* [DONE] find element with article title and save title in const */
      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] make a HTML code for link and save it in to the const */
      /* get the title from the title element */

      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
      console.log(linkHTML);
      /* [IN PROGRESS] insert made HTML code to link list from left aside*/

      /*titleList.innerHTML = titleList.innerHTML + linkHTML;*/
      titleList.insertAdjacentHTML("beforeend", linkHTML);
    }
  }

  generateTitleLinks();
}
