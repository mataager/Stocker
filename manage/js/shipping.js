document.addEventListener("DOMContentLoaded", () => {
  fetchOrdersByStatus();
});

async function fetchOrdersByStatus() {
  const preloader = document.getElementById("preloader");

  // Define table content containers
  const completedOrdersTableBody = document.getElementById(
    "completed-orders-table-body"
  );
  const shippedOrdersTableBody = document.getElementById(
    "shipped-orders-table-body"
  );
  const deliveredOrdersTableBody = document.getElementById(
    "delivered-orders-table-body"
  );
  const returnedOrdersTableBody = document.getElementById(
    "returned-orders-table-body"
  );

  try {
    // Show the preloader
    preloader.classList.remove("hidden");

    // Fetch the data
    const response = await fetch(`${url}/Stores/${uid}/orders.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Clear existing content
    completedOrdersTableBody.innerHTML = "";
    shippedOrdersTableBody.innerHTML = "";
    deliveredOrdersTableBody.innerHTML = "";
    returnedOrdersTableBody.innerHTML = "";

    if (!data) {
      console.log("No orders found.");
      [
        "completed-orders-content",
        "shipped-orders-content",
        "delivered-orders-content",
        "returned-orders-content",
      ].forEach((contentId) => {
        checkAndDisplayEmptyMessage(
          `${contentId}-table-body`,
          contentId,
          `No ${contentId
            .replace("-content", "")
            .replace("-", " ")} orders yet.`
        );
      });
      return;
    }

    // Reverse orders for display
    const reversedOrders = Object.entries(data).reverse();

    for (const [orderId, order] of reversedOrders) {
      const customerName = order.personal_info?.name || "N/A";
      const email = order.personal_info?.email || "N/A";
      const city = order.personal_info?.city || "N/A";
      const address = order.personal_info?.address || "N/A";
      const phoneNumber = order.personal_info?.phone || "N/A";
      const houseNumber = order.personal_info?.phone2 || "N/A";
      const Customeruid = order.Customeruid;
      const cutomerorderuid = order.orderUID;
      const totalPrice =
        order.cart.reduce(
          (sum, item) =>
            sum + parseFloat(item.price.replace(" EGP", "")) * item.quantity,
          0
        ) + order.shippingFees;

      const row = document.createElement("tr");
      row.classList.add("point", "order-tr");
      row.setAttribute("data-order-id", orderId);

      // Determine buttons to show based on status
      const isCompleted =
        order.progress === "accepted" && !order.shippingstatus;

      const returnedButtonHTML = isCompleted
        ? ""
        : `<button type="button" class="addbtn pointer returned accept-order-btn p-7" data-order-id="${orderId}" id="" onclick="updateShippingStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'returned', event)">
             <p>Mark As Returned</p> <i class="bi bi-arrow-counterclockwise"></i>
           </button>`;

      const deliveredButtonHTML = isCompleted
        ? ""
        : `<button type="button" class="addbtn pointer delivered accept-order-btn p-7" data-order-id="${orderId}" id="" onclick="updateShippingStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'delivered', event)">
             <p>Mark As Delivered</p> <i class="bi bi-box-seam"></i>
           </button>`;

      const shippedButtonHTML = `
        <button type="button" class="addbtn pointer accept-order-btn out-for-shipping p-7 ${
          order.shippingstatus === "shipped, in the way to you."
            ? "shipped-disabled"
            : ""
        }" data-order-id="${orderId}" ${
        order.shippingstatus === "shipped, in the way to you."
          ? 'disabled="disabled"'
          : `onclick="updateShippingStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'shipped', event)"`
      } >
          <p>${
            order.shippingstatus === "shipped, in the way to you."
              ? "Shipped"
              : "Mark As Shipped"
          }</p>
          <i class="bi ${
            order.shippingstatus === "shipped, in the way to you."
              ? "bi-check"
              : "bi-truck"
          }"></i>
        </button>`;

      row.innerHTML = `
        <td>${orderId}</td>
        <td>${customerName}</td>
        <td class="w-300">${email}</td>
        <td>${city}</td>
        <td>
            <div class="flex center flex-start">
                <div class="loc-order-ico m-LR-2" onclick="searchonmap('${address}', event)">
                    <i class="bi bi-geo-alt"></i>
                </div>
                <div class="loc-order-ico m-LR-2" onclick="copytoclipbarod('${address}', event)">
                    <i class="bi bi-copy"></i>
                </div>
            </div>
        </td>
        <td>${phoneNumber}</td>
        <td>${houseNumber}</td>
        <td>${order.shippingFees} EGP</td>
        <td>${totalPrice.toFixed(2)} EGP</td>
        <td class="flex center align items w-800">
          ${shippedButtonHTML}
          ${returnedButtonHTML}
          ${deliveredButtonHTML}
          <button type="button" class="addbtn accept-order-btn pointer p-7" onclick="print('${orderId}')">
            <p>Print Order</p><i class="bi bi-printer"></i>
          </button>
        </td>
      `;

      // Append the row to the appropriate table based on the status
      if (isCompleted) {
        row.classList.add("green-tr");
        completedOrdersTableBody.appendChild(row);
      } else if (order.shippingstatus === "shipped, in the way to you.") {
        row.classList.add("blue-tr");
        shippedOrdersTableBody.appendChild(row);
      } else if (order.shippingstatus === "Delivered") {
        row.classList.add("light-move-tr");
        deliveredOrdersTableBody.appendChild(row);
      } else if (order.shippingstatus === "Returned") {
        row.classList.add("orange-tr");
        returnedOrdersTableBody.appendChild(row);
      }
    }

    // Add click event listeners to all rows
    document.querySelectorAll("tr.point").forEach((row) => {
      row.addEventListener("click", toggleOrderDetails);
    });

    // Handle empty messages for each section
    ["completed", "shipped", "delivered", "returned"].forEach((status) => {
      const body = document.getElementById(`${status}-orders-table-body`);
      const content = document.getElementById(`${status}-orders-content`);
      if (!body.children.length) {
        checkAndDisplayEmptyMessage(
          `${status}-orders-table-body`,
          `${status}-orders-content`,
          `No ${status} orders yet.`
        );
      }
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    // Hide the preloader
    preloader.classList.add("hidden");
  }
}

async function toggleOrderDetails(event) {
  const row = event.currentTarget;
  const nextRow = row.nextElementSibling;

  // Check if the next row is already the details row
  if (nextRow && nextRow.classList.contains("order-details")) {
    // Collapse to hide cart items
    nextRow.remove();
  } else {
    // Add wave loading effect
    row.classList.add("wave-loading");

    const MIN_LOADING_TIME = 1000; // Minimum wave effect duration in milliseconds
    const startTime = Date.now();

    try {
      const orderId = row.getAttribute("data-order-id");
      const response = await fetch(
        `${url}/Stores/${uid}/orders/${orderId}.json`
      );
      const order = await response.json();

      if (!order || !order.cart) {
        console.error("Order or cart is null or undefined.");
        return;
      }

      const cartItems = order.cart
        .map(
          (item) => `  
            <tr class="cart-item">
              <td colspan="11">
                <div style="display: flex; align-items: center; width: max-content;">
                  <img src="${item.photourl}" alt="${item.title}" 
                       style="width: auto; height: 80px; margin-right: 10px;" 
                       class="clickable-image pointer">
                  <div style="display: flex; flex-direction: column; gap: 5px;">
                    <p>${item.id}</p>
                    <p>${item.brand}</p>
                    <p>${item.productColor}</p>
                    <p>${item.productSize}</p>
                    <p>Qty: ${item.quantity}</p>
                    <p>${
                      parseFloat(item.price.replace(" EGP", "")) * item.quantity
                    } EGP</p>
                  </div>
                </div>
              </td>
            </tr>`
        )
        .join("");

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      // Wait for the remaining time before adding the details row
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      const detailsRow = document.createElement("tr");
      detailsRow.classList.add("order-details");
      detailsRow.innerHTML = `
        <td colspan="11">
          <table style="width: 100%;">
            <tbody class="flex flex-wrap">
              ${cartItems}
            </tbody>
          </table>
        </td>
      `;
      row.after(detailsRow);

      // Attach click event to images
      document.querySelectorAll(".clickable-image").forEach((img) => {
        img.addEventListener("click", openModal);
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      // Remove the wave-loading effect after 2 seconds
      row.classList.remove("wave-loading");
    }
  }
}

// Modal handling functions
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const span = document.getElementsByClassName("close")[0];

function openModal(event) {
  event.stopPropagation(); // Prevent triggering row click event
  modal.style.display = "block";
  modalImg.src = event.target.src;
  captionText.innerHTML = event.target.alt;
}
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

async function updateShippingStatus(
  orderId,
  Customeruid,
  cutomerorderuid,
  status,
  event
) {
  event.stopPropagation(); // Prevent row click event

  const customerUid = Customeruid;
  const customerOrderUid = cutomerorderuid;

  const row = document.querySelector(`tr[data-order-id="${orderId}"]`);
  if (!row) {
    console.error("Row not found");
    return;
  }

  // Get the current authenticated user
  const user = firebase.auth().currentUser;
  if (!user) {
    Swal.fire({
      title: "Authentication Required!",
      text: "You need to be signed in to update the order status.",
      icon: "warning",
      confirmButtonText: "Okay",
    });
    return; // Exit if the user is not authenticated
  }

  try {
    // Get the ID token of the authenticated user
    const idToken = await user.getIdToken();
    if (status === "shipped") {
      // Update the status in the store's order database with ID token
      const response = await fetch(
        `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            shippingstatus: "shipped, in the way to you.",
          }),
        }
      );
      const shippedStatus = "shipped, in the way to you.";
      // Update the customer's order history as well
      await updateCustomerOrder(
        customerUid,
        customerOrderUid,
        idToken,
        shippedStatus
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Move the row to the completed orders table and remove unwanted buttons
      const completedOrdersTableBody = document.getElementById(
        "completed-orders-table-body"
      );
      const acceptedRow = row.cloneNode(true);
      acceptedRow.querySelector(".accept-order-btn")?.remove();
      acceptedRow.querySelector(".delete-order-btn")?.remove();
      completedOrdersTableBody.appendChild(acceptedRow);
      row.remove(); // Remove from the current table

      Swal.fire({
        title: "Shipped!",
        text: "Order has been marked as shipped.",
        icon: "success",
      }).then(() => {
        // location.reload();
      });
    } else if (status === "delivered") {
      // Update the status in the store's order database with ID token
      const response = await fetch(
        `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            shippingstatus: "Delivered",
          }),
        }
      );
      const shippedStatus = "Delivered";
      // Update the customer's order history as well
      await updateCustomerOrder(
        customerUid,
        customerOrderUid,
        idToken,
        shippedStatus
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Move the row to the completed orders table and remove unwanted buttons
      const completedOrdersTableBody = document.getElementById(
        "completed-orders-table-body"
      );
      const acceptedRow = row.cloneNode(true);
      acceptedRow.querySelector(".accept-order-btn")?.remove();
      acceptedRow.querySelector(".delete-order-btn")?.remove();
      completedOrdersTableBody.appendChild(acceptedRow);
      row.remove(); // Remove from the current table

      Swal.fire({
        title: "Delivered",
        text: "Order has been marked as Delivered.",
        icon: "success",
      }).then(() => {
        // location.reload();
      });
    } else if (status === "returned") {
      // Update the status in the store's order database with ID token
      const response = await fetch(
        `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            shippingstatus: "Returned",
          }),
        }
      );
      const shippedStatus = "Returned";
      // Update the customer's order history as well
      await updateCustomerOrder(
        customerUid,
        customerOrderUid,
        idToken,
        shippedStatus
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Move the row to the completed orders table and remove unwanted buttons
      const completedOrdersTableBody = document.getElementById(
        "completed-orders-table-body"
      );
      const acceptedRow = row.cloneNode(true);
      acceptedRow.querySelector(".accept-order-btn")?.remove();
      acceptedRow.querySelector(".delete-order-btn")?.remove();
      completedOrdersTableBody.appendChild(acceptedRow);
      row.remove(); // Remove from the current table

      Swal.fire({
        title: "Returned",
        text: "Order has been marked as Returned.",
        icon: "success",
      }).then(() => {
        // location.reload();
      });
    }

    // updateTableVisibility();
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Error",
      text: `Failed to update order status: ${error.message}`,
      icon: "error",
    });
  }
}

async function updateCustomerOrder(
  customerUid,
  customerOrderUid,
  idToken,
  shippedStatus
) {
  const orderHistoryUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${customerUid}/orderHistory/${uid}/${customerOrderUid}.json?auth=${idToken}`;

  try {
    const response = await fetch(orderHistoryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingstatus: shippedStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update customer's order history");
    }
  } catch (error) {
    console.error("Error updating customer's order history:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
