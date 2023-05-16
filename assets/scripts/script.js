const url = 'http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline';

const options = {
  method: 'GET',
};

const fetchData = async () => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

const root = document.querySelector('.root');

const drawData = async () => {
  const result = await fetchData();

  result.forEach(product => {
    const rating = product.rating !== null ? product.rating : 5;
    const colorSquares = product.product_colors.map(color => `<div class="color-square" style="background-color: ${color.hex_value}"></div>`).join("");
    const myHtml = `
      <article class="main-container">
        <div class="add-to-fav">
          <p id="fav-icon">♡</p>
        </div>
        <figure>
          <img id="cos-img" src="${product.image_link}" alt="${product.name}"/>
        </figure>
        <h3 id="cos-name">${product.name}</h3>
        <a href="${product.website_link}" target="_blank" id="cos-brand">${product.brand}</a>
        <p id="cos-description">${product.description}</p>
        <div class="colors-rating">
          <div class="colors">
            <p id="cos-colors">Colors:</p>
            <div class="color-squares">
              ${colorSquares}
            </div>
          </div>
          <div class="rating">
            <p id="cos-rating">Rating:</p><p id="cos-rating-specs">${rating}</p>
          </div>
        </div>
        <div class="price-buy">
          <div class="price">
            <span id="cos-price">${product.price}$</span>
          </div>
          <div class="buy">
            <a id="cos-buy" href="${product.product_link}" target="_blank">Buy Now</a>
          </div>
        </div>
      </article>`;
    root.innerHTML += myHtml;
  });
};

drawData();
