// coke don't steal this

window.complete = 1;

fetch("https://buggem.github.io/food-order-scripts/food.json").then(req => {
	if(req.status == 200) req.json().then(jsdata => {
		window.food = jsdata.food;
		window.foodPrices = jsdata.prices;
		window.complete = 0;
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
  if(window.complete > 0) {
    if(window.complete == 2) {
      document.getElementById("reciept").innerText = "";
      document.getElementById("header") .innerText = "Order Placed!";
      document.getElementById("desc") .innerText = `Order number \#${Math.floor(Math.random()*10000).padStart(4, "0")}`;
	  return;
    }
    return;
  }
  window.complete = 2; // we're done here
  
  let awesomeWin = window.open(document.location.href); // really stupid iframe without src logic, at least in ff and chrome
  
  let cartItems = awesomeWin.document.cookie.split("cartItems=");
  if(cartItems.length < 2) {
    cartItems = food.map(a => 0); // generate array
  } else {
    cartItems = JSON.parse(decodeURIComponent(cartItems[1].split(";")[0])); // parse saved
  }

  // set it in the shadow window (wtf moment)
  awesomeWin.document.cookie = `cartItems=; domain=.googleusercontent.com; path=/; expires=${new Date(0).toString()}; SameSite=Lax; Secure`;

  document.getElementById("reciept").innerText = reciept(cartItems);
  document.getElementById("header") .innerText = "Are you sure you want to proceed?";
  document.getElementById("desc") .innerText = `\$${total(cartItems)} will be charged to your account.\n\n(nothing will be charged, this is for demonstration purposes only)`;

  awesomeWin.close();
}
