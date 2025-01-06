// Function to fetch user data and render addresses dynamically

function updateCartSummary() {
  // Retrieve cart items from localStorage
  let cart = localStorage.getItem("cart");

  // Check if the cart is not empty
  if (cart) {
    // Parse the JSON string into an array
    cart = JSON.parse(cart);

    // Initialize total price
    let totalPrice = 0;

    // Iterate through cart items and sum up the prices
    cart.forEach((item) => {
      // Extract the numeric value from the price string and convert it to a number
      let price = parseFloat(item.price.replace(" EGP", "")); // Convert price to number
      let quantity = parseInt(item.quantity) || 1; // Get quantity, default to 1 if not available

      // Add the product of price and quantity to the total price
      totalPrice += price * quantity;
    });

    // Update the cart total element in the DOM
    document.getElementById("cart-total").innerText = `${totalPrice} EGP`;

    // Retrieve the shipping fees from the DOM and convert it to a number
    let shippingFees =
      parseFloat(document.getElementById("shipping-fees-total").innerText) || 0;

    // Calculate the final price (cart total + shipping fees)
    let finalPrice = totalPrice + shippingFees;

    // Update the total price element in the DOM
    document.getElementById("total-price").innerText = `${finalPrice} EGP`;
  } else {
    // If no cart exists, reset the totals
    document.getElementById("cart-total").innerText = "0 EGP";
    document.getElementById("total-price").innerText = "0 EGP";
  }
}

// Trigger the function automatically on page load
document.addEventListener("DOMContentLoaded", updateCartSummary);

// Monitor changes to the localStorage (for automatic updates)
window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    updateCartSummary();
  }
});

function observeShippingFees() {
  const shippingFeesElement = document.getElementById("shipping-fees-total");
  const observer = new MutationObserver(updateCartSummary);

  // Observe changes to the text content of the shipping fees element
  observer.observe(shippingFeesElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

// Call the function to update the shipping fees on page load
window.onload = function () {
  updateShippingFees();
  observeShippingFees();
};

function showMoreShippingData() {
  const shippingInfo = document.getElementById("shippingInfo");
  const addToCartButton = document.getElementById("shiptxtinfo");
  const icon = document.getElementById("shippininfoicon");
  icon.classList = "";

  if (shippingInfo) {
    if (shippingInfo.classList.contains("hidden")) {
      shippingInfo.classList.remove("hidden");
      addToCartButton.innerHTML = "Hide Shipping Info";
      icon.classList = "bi bi-dash";
    } else {
      shippingInfo.classList.add("hidden");
      addToCartButton.innerHTML = "Show More Info";
      icon.classList = "bi bi-plus";
    }
  }
}
function fetchUserAddressAndRender() {
  // Ensure the user is authenticated
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        // Get the user's ID token for secure database access
        const idToken = await user.getIdToken();

        // URL to the user's data
        const url = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${user.uid}.json?auth=${idToken}`;

        // Fetch user data
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch user data.");

        const userData = await response.json();

        // Render addresses in the provided div
        if (userData && userData.address) {
          renderAddresses(userData.address);
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not load your address data.",
        });
      }
    } else {
    }
  });
}

function renderAddresses(addresses) {
  const container = document.getElementById("address-area");
  container.innerHTML = ""; // Clear existing content

  let firstAddressCity = null; // To capture the first address's city
  let firstAddress = null; // To capture the first address details

  Object.values(addresses).forEach((address, index) => {
    const div = document.createElement("div");
    div.classList.add("account-section", "address-card");
    div.setAttribute(
      "onclick",
      `handleAddressClick('${address.city}','${address.fullAddress}','${address.governorate}', this)`
    );

    // Apply special styling to the first card
    if (index === 0) {
      div.style.border = "2px solid rgb(131, 131, 131)";
      governorate = address.governorate;
      firstAddressCity = address.city;
      firstAddress = address.fullAddress; // Store the first address
    }

    div.innerHTML = `
      <div class="details-row">
        <div class="detail-group">
          <h6>Governorate</h6>
          <p>${address.governorate}</p>
        </div>
        <div class="detail-group">
          <h6>City/State</h6>
          <p>${address.city}</p>
        </div>
      </div>
      <div class="details-row">
        <div class="detail-group">
          <h6>Area</h6>
          <p>${address.area}</p>
        </div>
        <div class="detail-group">
          <h6>House-Number</h6>
          <p>${address.houseNumber}</p>
        </div>
      </div>
      <div class="details-row">
        <div class="detail-group">
          <h6>Full Address</h6>
          <p>${address.fullAddress}</p>
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  // Store the first address city and full address in localStorage if they exist
  if (firstAddressCity && firstAddress && governorate) {
    localStorage.setItem("Governorate", governorate);
    localStorage.setItem("City", firstAddressCity);
    localStorage.setItem("Payment", "COD");
    // localStorage.setItem("Address", JSON.stringify(firstAddress));
    localStorage.setItem("Address", firstAddress);
    updateShippingFees();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const shippingFeesElement = document.getElementById("shipping-fees"); // Get the shipping fees element

  if (shippingFeesElement) {
    const savedCity = localStorage.getItem("City"); // Get the city from local storage

    if (savedCity) {
      if (
        savedCity === "Cairo" ||
        savedCity === "Giza" ||
        savedCity === "Alexandria"
      ) {
        shippingFeesElement.innerText = "65 EGP";
        localStorage.setItem("shippingFees", "65");
      } else {
        shippingFeesElement.innerText = "100 EGP";
        localStorage.setItem("shippingFees", "100");
      }
    } else {
      // Default if no city is selected
      shippingFeesElement.innerText = "100 EGP";
      localStorage.setItem("shippingFees", "100");
    }
  }
});

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", fetchUserAddressAndRender);
