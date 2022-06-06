"use strict";

let modalView = false;
let imgCount = 0;

const navToggleBtn = document.querySelector(".nav__btn--toggle");
const navCloseBtn = document.querySelector(".nav__btn--close");
const expandableNav = document.querySelector(".nav__list--one");
const nextImgBtns = document.querySelectorAll(".slider__next");
const prevImgBtns = document.querySelectorAll(".slider__prev");
const firstImg = document.querySelector("#image-01-main");
const modalFirstImg = document.querySelector("#image-01-modal");
const imgThumbnails = document.querySelectorAll(".slider__btn--thumbnail");
const openModal = document.querySelector(".slider__images");
const closeModal = document.querySelector(".modal__close-btn");
const imgModal = document.querySelector(".modal");
const modalController = [openModal, closeModal];

// Expand navigation section
const navSectionController = function () {
  expandableNav.classList.toggle("nav__list--disabled");
};

// Change main image
const setImg = function (value) {
  const img = !modalView ? firstImg : modalFirstImg;
  img.style.marginLeft = `-${25 * value}%`;
};

const resetImg = function () {
  setImg(0);
  setActiveThumbnail(0);
};

const goToNextImg = function () {
  imgCount++;
  if (imgCount === 4) imgCount = 3;
  setActiveThumbnail(imgCount);
  setImg(imgCount);
};

const goToPrevImg = function () {
  imgCount--;
  if (imgCount === -1) imgCount = 0;
  setActiveThumbnail(imgCount);
  setImg(imgCount);
};

const setActiveThumbnail = function (position) {
  imgThumbnails.forEach((thumbnail) => {
    if (thumbnail.dataset.imgValue !== String(position))
      thumbnail.classList.remove("active");
    else thumbnail.classList.add("active");
  });
};

const toggleImage = function () {
  const position = Number(this.dataset.imgValue);
  setActiveThumbnail(position);
  setImg(position);
};

const toggleModal = function () {
  imgModal.classList.toggle("disabled");
  if (!imgModal.classList.contains("disabled")) modalView = true;
  else modalView = false;
  console.log(modalView);
};

imgThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", toggleImage);
});

nextImgBtns.forEach((btn) => btn.addEventListener("click", goToNextImg));
prevImgBtns.forEach((btn) => btn.addEventListener("click", goToPrevImg));

modalController.forEach((button) =>
  button.addEventListener("click", function () {
    toggleModal();
    resetImg();
  })
);

imgModal.addEventListener("click", function (e) {
  if (e.target === imgModal) {
    toggleModal();
    resetImg();
  }
});

navToggleBtn.addEventListener("click", navSectionController);
navCloseBtn.addEventListener("click", navSectionController);
