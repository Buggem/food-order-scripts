// coke don't steal this

window.complete = true;

fetch("https://buggem.github.io/food-order-scripts/food.json").then(req => {
	if(req.status == 200) req.json().then(jsdata => {
		window.food = jsdata.food;
		window.foodPrices = jsdata.prices;
		window.complete = false;
	});
});

window.total = (cartItems) => {
  return cartItems.reduce((prev, val, i) => prev + (foodPrices[i] * val), 0).toFixed(2);
};

window.reciept = (cartItems) => {
  return `${cartItems.map((a, i) => (a == 0 ? null : `${a}x ${food[i]} | \$${(foodPrices[i]*a).toFixed(2)} `)).filter(a => { return a != null; }).join('\n')}


Total: \$${total(cartItems)}`;
};
window.onclick = () => {
  if(window.complete) return;
  window.complete = true; // we're done here
  
  let awesomeWin = window.open(document.location.href); // really stupid iframe without src logic, at least in ff and chrome
  
  let cartItems = awesomeWin.document.cookie.split("cartItems=");
  if(cartItems.length < 2) {
    cartItems = food.map(a => 0); // generate array
  } else {
    cartItems = JSON.parse(decodeURIComponent(cartItems[1].split(";")[0])); // parse saved
  }

  let toaddIndex = food.indexOf(document.getElementById("toadd").innerText); // get item index
  toaddIndex = (toaddIndex < 0) ? 0 : toaddIndex;
  cartItems[toaddIndex]++; // add

  // set it in the shadow window (wtf moment)
  awesomeWin.document.cookie = `cartItems=${encodeURIComponent(JSON.stringify(cartItems))}; domain=buggem.github.io; path=/; expires=${new Date(Date.now() + 99999999999).toString()}; SameSite=Lax; Secure`;
  
  document.getElementById("header").innerText = "Item Added to Cart!";
  document.getElementById("cartItems").innerText = reciept(cartItems);
  document.getElementById("cartItems").style.display = "inline";
  document.getElementById("oMsg").style.display = "none";
  awesomeWin.close();
}
