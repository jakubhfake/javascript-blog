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

  const optArticleSelector = ".post",
    optTitleSelector = ".post-title",
    optTitleListSelector = ".titles";

  function generateTitleLinks() {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    function clearMessage() {}
    clearMessage();

    /* [DONE] find all the articles and save them to variable: articles */
    let articles = document.querySelectorAll(optArticleSelector);

    let html = "";
    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute("id");
      /*console.log(articleId);*/
      /* [DONE] find the title element and get the title from the title element*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* [DONE] create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        "</span></a></li>";

      /* [ DONE] insert link into html variable */

      html = html + linkHTML;
      console.log(html);
    }

    titleList.innerHTML = html;
  }
  generateTitleLinks();
  const links = document.querySelectorAll(".titles a");
  console.log(links);
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
