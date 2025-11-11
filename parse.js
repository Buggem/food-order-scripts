// coke don't steal this

window.complete = false;
window.food = [
  "Hot Crispy Chicken",
  "BLT Sandwich",
  "Eggs on Toast",
  "Cappuccino",
  "Long Black",
  "Milkshake",
  "mystery juice"
];
window.foodPrices = [
  14.5,
  13,
  9,
  4.5,
  4,
  6,
  3
];
window.reciept = (cartItems) => {
  let delStr = 'bye'; // nukestr
  
  cartItems.map((a, i) => (a == 0 ? delStr : `${a}x ${food[i]} | \$${(foodPrices[i]*a).toFixed(2)} `)).filter(a => { return a != delStr; }).join('\n') +
    "\nTotal: $" + cartItems.reduce((prev, val, i) => prev + (foodPrices[i] * val), 0).toFixed(2);
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
  awesomeWin.document.cookie = "cartItems=" + encodeURIComponent(JSON.stringify(cartItems)) + "; domain=.googleusercontent.com; path=/; expires=" + new Date(Date.now() + 99999999999).toString() + "; SameSite=Lax; Secure";
  
  document.getElementById("header").innerText = "Item Added to Cart!";
  document.getElementById("cartItems").innerText = reciept(cartItems);
  document.getElementById("cartItems").style.display = "inline";
  document.getElementById("oMsg").style.display = "none";
  awesomeWin.close();
}
