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
}
{
  /* delete list of links from left aside */
  /* for all articles: */
  /* read article id na save it in to the const */
  /* find element with article title and save title in const */
  /* make a HTML code for link and save it in to the const */
  /* insert made HTML code to link list from left aside*/
}


