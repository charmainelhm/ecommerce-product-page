"use strict";

let modalView = false;
let imgCount = 0;

const state = {
  inventory: [
    {
      id: "1234",
      product: "Fall Limited Edition Sneakers",
      img_url: "images/image-product-1.jpg",
      org_price: "250",
      discount: "0.5",
    },
  ],
  cart: [],
};

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
const quantityControllers = document.querySelectorAll(".input-quantity button");
const form = document.querySelector(".add-item");
const quantity = document.querySelector(".quantity");
const errorMsg = document.querySelector(".error-message");
const cart = document.querySelector(".nav__cart");
const cartBtn = document.querySelector(".nav__btn--cart");
const cartList = document.querySelector(".cart__list");
const cartDropdown = document.querySelector(".cart");
const counter = document.querySelector(".nav__cart .counter");

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

const updateQuantity = function (e) {
  const action = e.target.dataset.quantity;
  if (action === "minus" && quantity.value !== "0") quantity.value--;
  if (action === "plus") quantity.value++;
  if (quantity.value > 0) errorMsg.textContent = "";
};

const locateInInventory = function (addedItem) {
  const item = state.inventory.find((item) => item.id === addedItem.productId);
  return item;
};

const addItemToCart = function (inventoryItem, addedItem) {
  const index = state.cart.findIndex(
    (item) => item.product === inventoryItem.product
  );

  if (index > -1) {
    state.cart[index].qty += Number(addedItem.quantity);
    return;
  }

  const newCartItem = {
    id: inventoryItem.id,
    product: inventoryItem.product,
    img_url: inventoryItem.img_url,
    org_price: Number(inventoryItem.org_price),
    discount: Number(inventoryItem.discount),
    qty: Number(addedItem.quantity),
  };

  state.cart.push(newCartItem);
};

const deleteItemFromCart = function (button) {
  const id = button.closest(".cart__item").dataset.id;
  const index = state.cart.findIndex((item) => item.id === id);

  state.cart.splice(index, 1);
  updateCart();
};

const updateCart = function () {
  cartList.innerHTML = "";
  if (state.cart.length === 0) {
    cart.classList.add("cart--empty");
    const markup = `<p class="cart__message">Your cart is empty.</p>`;
    cartList.insertAdjacentHTML("afterbegin", markup);
    return;
  }
  state.cart.forEach((item) => {
    const markup = `
            <li class="cart__item" data-id="${item.id}">
              <figure class="figure cart__img">
                <img
                  class="rounded"
                  src=${item.img_url}
                  alt=""
                />
              </figure>
              <div class="cart__details">
                <h4 class="details__name">${item.product}</h4>
                <span class="details__price">$ ${(
                  item.org_price * item.discount
                ).toFixed(2)}</span>
                <span class="details__quantity">x ${item.qty}</span>
                <span class="details__total">$ ${(
                  item.org_price *
                  item.discount *
                  item.qty
                ).toFixed(2)}</span>
              </div>
              <button onclick="deleteItemFromCart(this)" class="button cart__btn--delete">
                <img src="images/icon-delete.svg" alt="Delete Item" />
              </button>
            </li>
      `;

    cart.classList.remove("cart--empty");
    counter.innerHTML = `${state.cart.length}`;
    cartList.insertAdjacentHTML("afterbegin", markup);
  });
};

const resetForm = function () {
  quantity.value = 0;
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

quantityControllers.forEach((button) =>
  button.addEventListener("click", updateQuantity)
);

cartBtn.addEventListener("click", function () {
  cartDropdown.classList.toggle("disabled");
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!quantity.validity.valid) {
    errorMsg.textContent = "Minimum quantiy should be 1!";
    return;
  }
  const formData = new FormData(e.target);
  const addedItem = Object.fromEntries(formData);
  const inventoryItem = locateInInventory(addedItem);

  addItemToCart(inventoryItem, addedItem);
  updateCart();
  resetForm();
});
