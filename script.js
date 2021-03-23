// access Key: W28lw8bZhKBoWMJOza85jJS0iZqiE1wCekgIcesaAmw
let count = 10;
const url = `https://api.unsplash.com/photos/random/?client_id=W28lw8bZhKBoWMJOza85jJS0iZqiE1wCekgIcesaAmw&count=${count}`;
const imgsContainer = document.querySelector(".imgs_container");
const loaderContainer = document.querySelector(".loader_container");
let isLoad = false;
let lengthImages = 0;
let countImageLoading = 0;
loaderContainer.classList.add("active");
async function FetchUrl(URL) {
  const data = await fetch(URL).then((data) => data.json());
  lengthImages = data.length;
  data.forEach((obj) => {
    const {
      alt_description: desc,
      links: { html: href },
      urls: { regular: src },
    } = obj;
    displayImg({ desc, href, src });
  });
  loaderContainer.classList.remove("active");
}
function setAttributes(el, attributes) {
  for (const key in attributes) {
    if (Object.hasOwnProperty.call(attributes, key)) {
      const value = attributes[key];
      el.setAttribute(key, value);
    }
  }
}

function loadImage() {
  countImageLoading++;

  if (countImageLoading == lengthImages) {
    isLoad = true;
  }
}
function displayImg({ desc, href, src }) {
  const linkTag = document.createElement("a");
  const img = document.createElement("img");
  setAttributes(linkTag, {
    href,
    title: desc,
    target: "_blank",
  });
  setAttributes(img, {
    src,
  });
  img.addEventListener("load", loadImage);
  linkTag.appendChild(img);
  imgsContainer.appendChild(linkTag);
}

window.addEventListener("scroll", () => {
  if (window.scrollY + 6000 > document.body.offsetHeight && isLoad) {
    isLoad = false;
    countImageLoading = 0;
    FetchUrl(url);
  }
});

FetchUrl(url);
