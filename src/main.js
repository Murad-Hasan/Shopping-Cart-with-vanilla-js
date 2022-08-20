let shop = document.getElementById("shop");

let basket = [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      const { id, name, price, desc, img } = item;
      return ` <div id=product-id-${id} class="item">
    <img width="220" src=${img} alt="">
    <div class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="price-quantity">
        <h2>$ ${price} </h2>
        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">0</div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
</div>`;
    })
    .join(""));
};

generateShop();

let increment = (id) => {
  let selectedItem = id;

  let search = basket.find((item) => item.id === selectedItem.id);

  search
    ? search.quantity++
    : basket.push({ id: selectedItem.id, quantity: 1 });
  // console.log(basket);
  update(selectedItem.id);
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((item) => item.id === selectedItem.id);
  if (search.quantity > 0) {
    search.quantity--;
  } else {
    return;
    // basket.splice(basket.indexOf(search), 1);
  }
  update(selectedItem.id);
  // console.log(basket);
};

let update = (id) => {
  let search = basket.find((item) => item.id === id);
  document.getElementById(id).innerHTML = search.quantity;
};
