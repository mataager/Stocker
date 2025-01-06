document.getElementById("add-more").addEventListener("click", function () {
  const icon = document.getElementById("add-more-rotate");
  icon.classList.add("rotate-icon");

  // Remove the class after the animation completes to allow re-adding on next click
  icon.addEventListener("animationend", () => {
    icon.classList.remove("rotate-icon");
  });

  let count = document.querySelectorAll(".input-set").length + 1;
  const inputContainer = document.getElementById("input-container");

  const newInputSet = document.createElement("div");
  newInputSet.classList.add(
    "flex",
    "center",
    "input-set",
    "mb-3",
    "flex-wrap",
    "mb-30",
    "add-product-cart",
    "product-record",
    "shadow"
  );
  newInputSet.id = `p${count}`;

  newInputSet.innerHTML = `
    <div class="i-div align-items mb-10i">
      <button type="button" style="border: none; margin-left:5px;margin-bottom:0px;" class="formbold-form-label point toggle-expand cus-btn">
        <i class="bi bi-arrows-angle-contract"></i>
        <i class="bi bi-arrows-angle-expand none"></i>
      </button>
      <button type="button" style="border: none; margin-left:5px;margin-bottom:0px;" class="formbold-form-label point toggle-duplicate cus-btn">
        <i class="bi bi-copy"></i>
      </button>
      <button type="button" style="border: none; margin-left:auto" class="point no-bg-i toggle-delete ml-auto cus-btn">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="flex center align-items ml-auto">
        <h5 class="none mr-3" id="Quantity">Quantity</h5>
        <h5 class="none" id="QuantityValue"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <h5 class="none mr-3" id="size">Size</h5>
        <h5 class="none" id="sizevalue"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <label class="circle none mr-3" id="Colorcircle"></label>
        <h5 class="none color-value" id="colorvalue"></h5>
      </div>
    </div>
    <div class="product-data" id="product-data">
      <div class="flex mb-10">
        <input id="size${count}" type="text" name="size" placeholder="Size" class="formbold-form-input m-LR-2">
        <input id="quantity${count}" value="1" type="text" name="quantity" placeholder="Quantity" class="formbold-form-input m-LR-2">
      </div>
      <div class="flex flex-wrap mb-3">
        <input type="text" id="img1_${count}" name="product-photo" placeholder="pic url 1" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img2_${count}" name="product-photo2" placeholder="pic url 2" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img3_${count}" name="product-photo3" placeholder="pic url 3" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img4_${count}" name="product-photo4" placeholder="pic url 4" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img5_${count}" name="product-photo5" placeholder="pic url 5" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img6_${count}" name="product-photo6" placeholder="pic url 6" class="formbold-form-input m-LR-2 mb-10">
      </div>
      <div class="flex flex-wrap center mb-3">
        <div class="flex flex-column align-items">
        
          <div class="drop-zone" id="dropZone1_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus1_${count}"></div>
        </div>
        <div class="flex flex-column align-items">
          
          <div class="drop-zone" id="dropZone2_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus2_${count}"></div>
        </div>
        <div class="flex flex-column align-items">
          
          <div class="drop-zone" id="dropZone3_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus3_${count}"></div>
        </div>
         <div class="flex flex-column align-items">
          
          <div class="drop-zone" id="dropZone4_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus4_${count}"></div>
        </div>
         <div class="flex flex-column align-items">
          
          <div class="drop-zone" id="dropZone5_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus5_${count}"></div>
        </div>
         <div class="flex flex-column align-items">
          
          <div class="drop-zone" id="dropZone6_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus6_${count}"></div>
        </div>
      </div>
      <div id="imageContainer"></div>
      <div class="flex center mb-3 mt-12">
        <div class="color-input-wrapper m-LR-2">
          <div class="flex center align-items">
            <input style="width:45px;" type="text" name="color" class="formbold-form-input">
            <input id="Color${count}" type="color" name="color-value" class="color-picker">
          </div>
        </div>
        <input id="colorname${count}" type="text" name="color-name" style="width: 50%;" placeholder="Black" class="formbold-form-input m-LR-2">
      </div>
      <input type="file" id="cameraInput1_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput1_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput2_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput2_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput3_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput3_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput4_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput4_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput5_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput5_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput6_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput6_${count}" accept="image/*" style="display: none;">
      
    </div>
  `;

  inputContainer.appendChild(newInputSet);
  setupToggleExpand(newInputSet.querySelector(".toggle-expand"));
  setupDeleteButton(newInputSet.querySelector(".toggle-delete"));
  setupDuplicateButton(newInputSet.querySelector(".toggle-duplicate"));

  setupFileInputHandlers(count);
});

//handling price after sale
const productPriceInput = document.getElementById("productprice");
const saleAmountInput = document.getElementById("sale-amount");
const finalPriceInput = document.getElementById("finalprice");

function calculateFinalPrice() {
  const productPrice = parseFloat(productPriceInput.value) || 0;
  const saleAmount = parseFloat(saleAmountInput.value) || 0;

  const discount = productPrice * (saleAmount / 100);
  const finalPrice = productPrice - discount;

  finalPriceInput.value = finalPrice.toFixed(2);
}
//

productPriceInput.addEventListener("input", calculateFinalPrice);
saleAmountInput.addEventListener("input", calculateFinalPrice);

function setupToggleExpand(button) {
  button.addEventListener("click", function () {
    const expandIcon = button.querySelector(".bi-arrows-angle-expand");
    const contractIcon = button.querySelector(".bi-arrows-angle-contract");
    const inputSet = button.closest(".input-set");
    const productData = inputSet.querySelector("#product-data");

    // Determine the dynamic ID for the elements inside `product-data`
    const idSuffix = inputSet.id.replace(/^p/, ""); // Extracts the numeric part of the ID

    const sizeInput = productData.querySelector(`#size${idSuffix}`);
    const quantityInput = productData.querySelector(`#quantity${idSuffix}`);
    const colorInput = productData.querySelector(`#Color${idSuffix}`);

    const sizeLabel = inputSet.querySelector("#size");
    const quantityLabel = inputSet.querySelector("#Quantity");
    const colorCircleLabel = inputSet.querySelector("#Colorcircle");
    const sizeValue = inputSet.querySelector("#sizevalue");
    const colorValue = inputSet.querySelector("#colorvalue");
    const quantityValue = inputSet.querySelector("#QuantityValue");

    if (expandIcon.classList.contains("none")) {
      expandIcon.classList.remove("none");
      contractIcon.classList.add("none");
      productData.classList.add("none");

      sizeLabel.classList.remove("none");
      colorCircleLabel.classList.remove("none");
      quantityLabel.classList.remove("none");
      sizeValue.classList.remove("none");
      colorValue.classList.remove("none");
      quantityValue.classList.remove("none");

      // Display the values from the inputs
      sizeValue.textContent = sizeInput ? sizeInput.value : "";
      quantityValue.textContent = quantityInput ? quantityInput.value : "";
      if (colorInput) {
        colorCircleLabel.style.backgroundColor = colorInput.value;
        colorValue.textContent = colorInput.value;
      }
    } else {
      expandIcon.classList.add("none");
      contractIcon.classList.remove("none");
      productData.classList.remove("none");

      sizeLabel.classList.add("none");
      colorCircleLabel.classList.add("none");
      quantityLabel.classList.add("none");
      sizeValue.classList.add("none");
      colorValue.classList.add("none");
      quantityValue.classList.add("none");
    }
  });
}

function setupDeleteButton(button) {
  button.addEventListener("click", function () {
    const element = document.getElementById("input-container");

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        button.closest(".product-record").remove();
      }
    });
  });
}

function setupDuplicateButton(button) {
  button.addEventListener("click", function () {
    const productRecord = button.closest(".product-record");
    const id = productRecord ? productRecord.id : null;

    if (id) {
      const newProductRecord = productRecord.cloneNode(true);
      const currentCount = document.querySelectorAll(".input-set").length + 1;
      newProductRecord.id = `p${currentCount}`;

      // Update IDs for inputs and elements within the new duplicate
      updateElementIds(newProductRecord, currentCount);

      document.getElementById("input-container").appendChild(newProductRecord);
      setupToggleExpand(newProductRecord.querySelector(".toggle-expand"));
      setupDeleteButton(newProductRecord.querySelector(".toggle-delete"));
      setupDuplicateButton(newProductRecord.querySelector(".toggle-duplicate"));
      setupFileInputHandlers(currentCount);
    }
  });
}

function updateElementIds(element, count) {
  element.querySelectorAll("[id]").forEach((el) => {
    const newId = el.id.replace(/\d+$/, count);
    el.id = newId;
  });
}

function setupFileInputHandlers(count) {
  const dropZone1 = document.getElementById(`dropZone1_${count}`);
  const dropZone2 = document.getElementById(`dropZone2_${count}`);
  const dropZone3 = document.getElementById(`dropZone3_${count}`);
  const dropZone4 = document.getElementById(`dropZone4_${count}`);
  const dropZone5 = document.getElementById(`dropZone5_${count}`);
  const dropZone6 = document.getElementById(`dropZone6_${count}`);
  const uploadStatus1 = document.getElementById(`uploadStatus1_${count}`);
  const uploadStatus2 = document.getElementById(`uploadStatus2_${count}`);
  const uploadStatus3 = document.getElementById(`uploadStatus3_${count}`);
  const uploadStatus4 = document.getElementById(`uploadStatus4_${count}`);
  const uploadStatus5 = document.getElementById(`uploadStatus5_${count}`);
  const uploadStatus6 = document.getElementById(`uploadStatus6_${count}`);
  const cameraInput1 = document.getElementById(`cameraInput1_${count}`);
  const galleryInput1 = document.getElementById(`galleryInput1_${count}`);
  const cameraInput2 = document.getElementById(`cameraInput2_${count}`);
  const galleryInput2 = document.getElementById(`galleryInput2_${count}`);
  const cameraInput3 = document.getElementById(`cameraInput3_${count}`);
  const galleryInput3 = document.getElementById(`galleryInput3_${count}`);
  const cameraInput4 = document.getElementById(`cameraInput4_${count}`);
  const galleryInput4 = document.getElementById(`galleryInput4_${count}`);
  const cameraInput5 = document.getElementById(`cameraInput5_${count}`);
  const galleryInput5 = document.getElementById(`galleryInput5_${count}`);
  const cameraInput6 = document.getElementById(`cameraInput6_${count}`);
  const galleryInput6 = document.getElementById(`galleryInput6_${count}`);

  dropZone1.addEventListener("click", () => galleryInput1.click());
  dropZone2.addEventListener("click", () => galleryInput2.click());
  dropZone3.addEventListener("click", () => galleryInput3.click());
  dropZone4.addEventListener("click", () => galleryInput4.click());
  dropZone5.addEventListener("click", () => galleryInput5.click());
  dropZone6.addEventListener("click", () => galleryInput6.click());

  galleryInput1.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone1, uploadStatus1)
  );
  cameraInput1.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone1, uploadStatus1)
  );
  galleryInput2.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone2, uploadStatus2)
  );
  cameraInput2.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone2, uploadStatus2)
  );

  //
  galleryInput3.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone3, uploadStatus3)
  );
  cameraInput3.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone3, uploadStatus3)
  );
  galleryInput4.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone4, uploadStatus4)
  );
  cameraInput4.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone4, uploadStatus4)
  );
  //
  galleryInput5.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone5, uploadStatus5)
  );
  cameraInput5.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone5, uploadStatus5)
  );
  galleryInput6.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone6, uploadStatus6)
  );
  cameraInput6.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone6, uploadStatus6)
  );
}

async function handleFileSelect(event, dropZone) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  const preloader = document.createElement("div");
  preloader.classList.add("uploadloader");
  dropZone.appendChild(preloader);

  // Remove any existing upload status elements
  const existingUploadStatus =
    dropZone.parentElement.querySelector(".upload-status");
  if (existingUploadStatus) {
    existingUploadStatus.remove();
  }

  const dropZoneId = dropZone.id;
  const count = dropZoneId.split("_").pop(); // Extract the count from the drop zone ID

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      body: formData,
    });

    const result = await response.json();
    preloader.remove();

    const imageUrl = result.data?.link;

    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");

    if (result.success) {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      dropZone.innerHTML = "";
      dropZone.appendChild(imgElement);

      // if (dropZoneId.includes("dropZone1")) {
      //   document.getElementById(`img1_${count}`).value = imageUrl;
      // } else if (dropZoneId.includes("dropZone2")) {
      //   document.getElementById(`img2_${count}`).value = imageUrl;
      // }
      // Extract the dropZone number and use it for setting the corresponding img
      const dropZoneNumber = dropZoneId.match(/\d+/)[0]; // This extracts the number from the dropZoneId
      if (dropZoneNumber >= 1 && dropZoneNumber <= 6) {
        document.getElementById(`img${dropZoneNumber}_${count}`).value =
          imageUrl;
      }

      if (uploadStatus) {
        uploadStatus.innerHTML = `<p><i class="bi bi-check-circle-fill blue-check"></i></p>`;
      }
    } else {
      if (uploadStatus) {
        uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${result.data.error}</p>`;
      }
    }
    // Append upload status to the parent of drop zone
    dropZone.parentElement.appendChild(uploadStatus);
  } catch (error) {
    preloader.remove();
    const uploadStatus = document.getElementById(
      `uploadStatus${dropZoneId.slice(-1)}`
    );
    if (uploadStatus) {
      uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${error.message}</p>`;
    }
    // Append upload status to the parent of drop zone
    dropZone.parentElement.appendChild(uploadStatus);
  }
}

function handleDragOver(event, dropZone) {
  event.preventDefault();
  dropZone.classList.add("drag-over");
}

function handleDragLeave(event, dropZone) {
  dropZone.classList.remove("drag-over");
}

async function handleDrop(event, dropZone) {
  event.preventDefault();
  dropZone.classList.remove("drag-over");

  const files = event.dataTransfer.files;
  if (files.length === 0) return;

  const formData = new FormData();
  formData.append("image", files[0]);

  const preloader = document.createElement("div");
  preloader.classList.add("uploadloader");
  dropZone.appendChild(preloader);

  // Remove any existing upload status elements
  const existingUploadStatus =
    dropZone.parentElement.querySelector(".upload-status");
  if (existingUploadStatus) {
    existingUploadStatus.remove();
  }

  const dropZoneId = dropZone.id;
  const count = dropZoneId.split("_").pop(); // Extract the count from the drop zone ID

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      body: formData,
    });

    const result = await response.json();
    preloader.remove();

    const imageUrl = result.data?.link;
    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");

    if (result.success) {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      dropZone.innerHTML = "";
      dropZone.appendChild(imgElement);

      // if (dropZoneId.includes("dropZone1")) {
      //   document.getElementById(`img1_${count}`).value = imageUrl;
      // } else if (dropZoneId.includes("dropZone2")) {
      //   document.getElementById(`img2_${count}`).value = imageUrl;
      // }
      // Extract the dropZone number and use it for setting the corresponding img
      const dropZoneNumber = dropZoneId.match(/\d+/)[0]; // Extract the number from dropZoneId

      // Check if the dropZoneNumber is within the range 1-6
      if (dropZoneNumber >= 1 && dropZoneNumber <= 6) {
        document.getElementById(`img${dropZoneNumber}_${count}`).value =
          imageUrl;
      }

      if (uploadStatus) {
        uploadStatus.innerHTML = `<p><i class="bi bi-check-circle-fill blue-check"></i></p>`;
      }
    } else {
      if (uploadStatus) {
        uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${result.data.error}</p>`;
      }
    }
    // Append upload status to the parent of drop zone
    dropZone.parentElement.appendChild(uploadStatus);
  } catch (error) {
    preloader.remove();
    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");
    uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${error.message}</p>`;
    dropZone.parentElement.appendChild(uploadStatus);
  }
}

document.querySelectorAll(".toggle-expand").forEach(function (button) {
  setupToggleExpand(button);
});

document.querySelectorAll(".toggle-delete").forEach(function (button) {
  setupDeleteButton(button);
});

document
  .getElementById("add-product-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Check if the user is authenticated
    const user = firebase.auth().currentUser; // Get the current user
    if (!user) {
      Swal.fire({
        title: "Authentication Required!",
        text: "You need to be signed in to add a product.",
        icon: "warning",
        confirmButtonText: "Okay",
        customClass: {
          container: "swal2-custom",
          title: "swal2-custom",
        },
      });
      return; // Exit if the user is not authenticated
    }

    if (user) {
      // Get the ID token of the authenticated user
      user.getIdToken().then((idToken) => {
        // Show the preloader and disable the submit button
        const submitButton = document.getElementById("sub-spin");
        const submitTxt = document.getElementById("sub-txt");

        submitTxt.classList.add("hidden");
        submitButton.classList.remove("hidden");

        // Collect input values
        const formData = new FormData(this);
        const product = {
          "Brand-Name": formData.get("Brand-Name"),
          "Product-Price": formData.get("Product-Price"),
          category: formData.get("category"),
          type: formData.get("Type"),
          piece: formData.get("Piece"),
          "sale-amount": formData.get("sale-amount"),
          "product-description": formData.get("product-description"),
          "posted-at": new Date().toLocaleString(),
          "product-photo": "", // Placeholder, will be set later
          "product-photo2": "", // Placeholder, will be set later
          "product-photo3": "", // Placeholder, will be set later
          "product-photo4": "", // Placeholder, will be set later
          "product-photo5": "", // Placeholder, will be set later
          "product-photo6": "", // Placeholder, will be set later
          "product-title": formData.get("product-title"),
          sizes: {}, // Object to store sizes and colors
        };

        // Iterate through each product input set
        document.querySelectorAll(".input-set").forEach((productSet) => {
          const size = productSet.querySelector('input[name="size"]').value;
          const colorname = productSet.querySelector(
            'input[name="color-name"]'
          ).value;
          const colorValue = productSet.querySelector(
            'input[name="color-value"]'
          ).value;
          const quantity = parseInt(
            productSet.querySelector('input[name="quantity"]').value
          ); // Convert to integer
          const imageUrl1 = productSet.querySelector(
            'input[name="product-photo"]'
          ).value;
          const imageUrl2 = productSet.querySelector(
            'input[name="product-photo2"]'
          ).value;
          const imageUrl3 = productSet.querySelector(
            'input[name="product-photo3"]'
          ).value;
          const imageUrl4 = productSet.querySelector(
            'input[name="product-photo4"]'
          ).value;
          const imageUrl5 = productSet.querySelector(
            'input[name="product-photo5"]'
          ).value;
          const imageUrl6 = productSet.querySelector(
            'input[name="product-photo6"]'
          ).value;

          // Set product photos if not already set
          if (!product["product-photo"]) product["product-photo"] = imageUrl1;
          if (!product["product-photo2"]) product["product-photo2"] = imageUrl2;
          if (!product["product-photo3"]) product["product-photo3"] = imageUrl3;
          if (!product["product-photo4"]) product["product-photo4"] = imageUrl4;
          if (!product["product-photo5"]) product["product-photo5"] = imageUrl5;
          if (!product["product-photo6"]) product["product-photo6"] = imageUrl6;

          // Create the color object
          const colorObject = {
            "color-value": colorValue,
            img1: imageUrl1,
            img2: imageUrl2,
            img3: imageUrl3,
            img4: imageUrl4,
            img5: imageUrl5,
            img6: imageUrl6,
            qty: quantity,
          };

          // Check if the size already exists in the product's sizes object
          if (!product.sizes[size]) {
            product.sizes[size] = {};
          }

          // Add the color object to the corresponding size
          product.sizes[size][colorname] = colorObject;
        });

        // Send the product object to the specified API URL with the ID token in the headers
        fetch(
          `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${user.uid}/Products.json?auth=${idToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(product),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            Swal.fire({
              title: "Success!",
              text: "Product added successfully.",
              icon: "success",
              showConfirmButton: false,
              customClass: {
                container: "swal2-custom",
                title: "swal2-custom",
              },
            });
            submitTxt.classList.remove("hidden");
            submitButton.classList.add("hidden");

            // Wait for 1.5 seconds before reloading the page
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while adding the product.",
              icon: "error",
              customClass: {
                container: "swal2-custom",
                title: "swal2-custom",
              },
            });
            // Hide spinner
            submitTxt.classList.remove("hidden");
            submitButton.classList.add("hidden");
          });
      });
    }
  });
