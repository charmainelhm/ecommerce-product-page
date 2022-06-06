"use strict";

const navToggleBtn = document.querySelector(".nav__btn--toggle");
const navCloseBtn = document.querySelector(".nav__btn--close");
const expandableNav = document.querySelector(".nav__list--one");
const nextImgBtn = document.querySelector(".slider__next");
const prevImgBtn = document.querySelector(".slider__prev");
const firstImg = document.querySelector("#image-01");
const imgThumbnails = document.querySelectorAll(".slider__btn--thumbnail");

let imgCount = 0;

const navSectionController = function () {
  expandableNav.classList.toggle("nav__list--disabled");
};

const setImg = function (value) {
  firstImg.style.marginLeft = `-${25 * value}%`;
};

const goToNextImg = function () {
  imgCount++;
  if (imgCount === 4) imgCount = 3;
  setImg(imgCount);
};

const goToPrevImg = function () {
  imgCount--;
  if (imgCount === -1) imgCount = 0;
  setImg(imgCount);
};

const resetActiveThumbnail = function () {
  imgThumbnails.forEach((thumbnail) => thumbnail.classList.remove("active"));
};

const toggleImage = function () {
  resetActiveThumbnail();
  const position = Number(this.dataset.imgValue);
  this.classList.add("active");
  setImg(position);
};

imgThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", toggleImage);
});

navToggleBtn.addEventListener("click", navSectionController);
navCloseBtn.addEventListener("click", navSectionController);

nextImgBtn.addEventListener("click", goToNextImg);
prevImgBtn.addEventListener("click", goToPrevImg);
