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
  document.getElementById("cartItems").innerText = cartItems.map((a, i) => `${a}x ${food[i]}`).join('\n');
  document.getElementById("cartItems").style.display = "inline";
  document.getElementById("oMsg").style.display = "none";
  awesomeWin.close();
}
