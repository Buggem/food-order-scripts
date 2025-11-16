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

window.onclick = null;
window.engaged = () => {
  if(window.ready < 2) return;
  
  window.onclick = window.engaged;
  
  if(window.complete > 0) {
    if(window.complete == 1) {
      document.getElementById("reciept").innerText = "";
      document.getElementById("header") .innerText = "Order Placed!";
      document.getElementById("desc") .innerText = `Order number \#${Math.floor(Math.random()*10000).toString().padStart(4, "0")}`;
	  window.complete = 2;
      return;
    }
    return;
  }
  window.complete = 1; // we're done here
    
  let cartItems = localStorage.getItem("cartItems");
  if(cartItems == null) {
    cartItems = food.map(a => 0); // generate array
  } else {
    cartItems = JSON.parse(decodeURIComponent(cartItems)); // parse saved
  }

  document.getElementById("reciept").innerText = reciept(cartItems);
  document.getElementById("header") .innerText = "Are you sure you want to proceed?";
  document.getElementById("desc") .innerText = `\$${total(cartItems)} will be charged to your account.\n\n(nothing will be charged, this is for demonstration purposes only)`;

  localStorage.removeItem("cartItems");
}
