"use strict";

const navToggleBtn = document.querySelector(".nav__btn--toggle");
const navCloseBtn = document.querySelector(".nav__btn--close");
const expandableNav = document.querySelector(".nav__list--one");

const navSectionController = function () {
  expandableNav.classList.toggle("nav__list--disabled");
};

navToggleBtn.addEventListener("click", navSectionController);
navCloseBtn.addEventListener("click", navSectionController);
