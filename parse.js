// coke don't steal this

window.complete = 0;
window.ready = 0;
fetch("https://buggem.github.io/food-order-scripts/food.json").then(req => {
	if(req.status == 200) req.json().then(jsdata => {
		window.food = jsdata.food;
		window.foodPrices = jsdata.prices;
		window.ready++;
	});
});

fetch("https://buggem.github.io/food-order-scripts/shared.js").then(req => {
	if(req.status == 200) req.text().then(jsdata => {
		eval(jsdata);
		window.ready++;
	});
});

window.onclick = () => {
  if(window.complete || window.ready < 2) return;
  window.complete = 1; // we're done here

  let cartItems = localStorage.getItem("cartItems");
  if(cartItems == null) {
    cartItems = food.map(a => 0); // generate array
  } else {
    cartItems = JSON.parse(decodeURIComponent(cartItems)); // parse saved
  }

  let toaddIndex = food.indexOf(document.getElementById("toadd").innerText); // get item index
  toaddIndex = (toaddIndex < 0) ? 0 : toaddIndex;
  cartItems[toaddIndex]++; // add

  localStorage.setItem("cartItems", encodeURIComponent(JSON.stringify(cartItems)));

  document.getElementById("header").innerText = "Item Added to Cart!";
  document.getElementById("cartItems").innerText = reciept(cartItems);
  document.getElementById("cartItems").style.display = "inline";
  document.getElementById("oMsg").style.display = "none";
}
