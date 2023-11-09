let cart = loadCart();
let cartSize = 0;

window.addEventListener('load', function() {
    tryLoadData();
    cartSize = 0;
    for(let c = 1; c < cart.length; c = c+2){
        cartSize += cart[c];
    }
    document.getElementById("cartNum").innerHTML = cartSize;
    
});

function loadCart(){
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
}

function tryLoadData() {
    fetch('./data.json').then(res => res.json()).then(data => 
    {
        displayCart(data);
        console.log("loaded data");
    }).catch(err => 
    {
        console.log("error loading data");
        console.log(err);
    });
}

function displayCart(jsonData) {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = ""; // Clear the existing content
    let totalPrice = 0;

    for (let i = 0; i < cart.length; i += 2) {
        // Retrieve the product ID and quantity from the cart
        const productId = cart[i];
        const quantity = cart[i + 1];

        // Find the firework data based on the product ID
        const fireworkData = jsonData.fireworkData.find(data => data.productid === productId);

        if (fireworkData && quantity > 0) {
            // Create a new cart item element
            const cartItem = document.createElement("div");
            cartItem.className = "cart-item";

            // Create elements to display firework name, price, quantity, and image type
            const nameElement = document.createElement("h3");
            nameElement.textContent = fireworkData.name;

            const priceElement = document.createElement("p");
            priceElement.textContent = "Each: $" + fireworkData.price;

            const quantityElement = document.createElement("p");
            quantityElement.textContent = "Quantity: " + quantity;

            const sumElement = document.createElement("h4");
            sumElement.textContent = "Price: $" + (fireworkData.price * quantity).toFixed(2);
            sumElement.style.float= "right";
            sumElement.style.marginRight= "10%";

            // Append the elements to the cart item
            cartItem.appendChild(nameElement);
            cartItem.appendChild(priceElement);
            cartItem.appendChild(quantityElement);

            if (jsonData.images[fireworkData.image_type]) {
                const imageElement = document.createElement("img");
                imageElement.src = jsonData.images[fireworkData.image_type][0]; 
                imageElement.width = 150;
                imageElement.height = 150;
                imageElement.style.marginBottom = "1%";

                // Append the image element to the cart item
                cartItem.appendChild(imageElement);
            }
            cartItem.appendChild(sumElement)

            // Append the cart item to the cart items container
            cartItems.appendChild(cartItem);

            totalPrice += fireworkData.price * quantity;
        }
    }
    // Display the total price at the bottom of the page
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.textContent = "Total Price: $" + totalPrice.toFixed(2);
}
