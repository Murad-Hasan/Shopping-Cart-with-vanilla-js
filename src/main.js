let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      const { id, name, price, desc, img } = item;
      const search = basket.find((item) => item.id === id) || [];
      return ` <div id=product-id-${id} class="item">
    <img width="220" src=${img} alt="">
    <div class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="price-quantity">
        <h2>$ ${price} </h2>
        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      } </div>
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

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      quantity: 1,
    });
  } else {
    search.quantity += 1;
  }

  // search ? search.quantity++ : basket.push({ id: selectedItem.id, quantity: 1 });

  // console.log(basket);
  update(selectedItem.id);
  localStorage.setItem("date", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((item) => item.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.quantity === 0) return;
  else {
    search.quantity -= 1;
    // basket.splice(basket.indexOf(search), 1);
  }

  update(selectedItem.id);
  basket = basket.filter((item) => item.quantity !== 0);
  // console.log(basket);
  localStorage.setItem("date", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((item) => item.id === id);
  document.getElementById(id).innerHTML = search.quantity;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  // console.log(basket.map((item) => item.quantity));
  // console.log(
  //   basket
  //     .map((item) => item.quantity)
  //     .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  // );
  cartIcon.innerHTML = basket
    .map((item) => item.quantity)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
};

calculation();
