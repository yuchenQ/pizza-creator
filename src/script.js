import * as wheel from "./wheel.js";
// Superiority of the DocumentFragment:
// 不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现
const docFragBtn = document.createDocumentFragment();
const docFragToppings = document.createDocumentFragment();
const selectedTopping = [];
const toppings = [
  {
    name: "Anchovy",
    labelImage: "./assets/toppings/anchovy.svg",
    contentImage: "./assets/toppings/anchovies.svg"
  },
  {
    name: "Bacon",
    labelImage: "./assets/toppings/bacon.svg",
    contentImage: "./assets/toppings/bacons.svg"
  },
  {
    name: "Basil",
    labelImage: "./assets/toppings/basil.svg",
    contentImage: "./assets/toppings/basils.svg"
  },
  {
    name: "Chili",
    labelImage: "./assets/toppings/chili.svg",
    contentImage: "./assets/toppings/chilies.svg"
  },
  {
    name: "Mozzarella",
    labelImage: "./assets/toppings/mozzarella.svg",
    contentImage: "./assets/toppings/mozzarellas.svg"
  },
  {
    name: "Mushroom",
    labelImage: "./assets/toppings/mushroom.svg",
    contentImage: "./assets/toppings/mushrooms.svg"
  },
  {
    name: "Olive",
    labelImage: "./assets/toppings/olive.svg",
    contentImage: "./assets/toppings/olives.svg"
  },
  {
    name: "Onion",
    labelImage: "./assets/toppings/onion.svg",
    contentImage: "./assets/toppings/onions.svg"
  },
  {
    name: "Pepper",
    labelImage: "./assets/toppings/pepper.svg",
    contentImage: "./assets/toppings/peppers.svg"
  },
  {
    name: "Pepperoni",
    labelImage: "./assets/toppings/pepperoni.svg",
    contentImage: "./assets/toppings/pepperoni.svg"
  },
  {
    name: "Peppers",
    labelImage: "./assets/toppings/peppers.svg",
    contentImage: "./assets/toppings/peppers.svg"
  },
  {
    name: "Sweetcorn",
    labelImage: "./assets/toppings/sweetcorn.svg",
    contentImage: "./assets/toppings/sweetcorn.svg"
  }
];

// window.addEventListener("DOMContentLoaded", renderToppingsForm);
wheel.handleEvent("DOMContentLoaded", {
  onElement: window,
  withCallback: () => {
    toppings.forEach(renderSingleTopping);
    document.querySelector("#toppingsChoiceForm").appendChild(docFragBtn);
    document.querySelector(".pizza-toppings").appendChild(docFragToppings);
  }
});

function renderSingleTopping({ name, labelImage, contentImage }) {
  const labelImg = document.createElement("img");
  // labelImg.setAttribute("src", labelImage);
  // labelImg.setAttribute("alt", name);
  labelImg.src = labelImage;
  labelImg.alt = name;

  const span = document.createElement("span");
  // span.innerText = name;
  span.appendChild(document.createTextNode(name));

  const btn = document.createElement("button");
  btn.className = "topping";
  // btn.className += "topping";
  // btn.classList.add("topping");
  // btn.classList.toggle("topping", true);
  btn.type = "button";
  btn.id = name;
  btn.appendChild(labelImg);
  btn.appendChild(span);
  docFragBtn.appendChild(btn);

  const contentImg = document.createElement("img");
  contentImg.setAttribute("src", contentImage);
  contentImg.setAttribute("alt", name);
  contentImg.setAttribute("class", "pizza-toppings-each-inactive");
  docFragToppings.appendChild(contentImg);

  const handleBtnClick = wheel.handleEvent("click", {
    onElement: btn,
    withCallback: onToppingClick(name, btn, contentImg)
  });
}

function onToppingClick(toppingName, toppingBtn, contentImage) {
  return () => {
    // var toppingBtn = document.querySelector(`button.topping#${name}`);
    if (selectedTopping.includes(toppingName)) {
      const index = selectedTopping.indexOf(toppingName);
      selectedTopping.splice(index, 1);
      toppingBtn.classList.remove("active");
      contentImage.classList.add("pizza-toppings-each-inactive");
      return;
    }
    selectedTopping.push(toppingName);
    toppingBtn.classList.add("active");
    contentImage.classList.remove("pizza-toppings-each-inactive");
  };
}
