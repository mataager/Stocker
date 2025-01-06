async function searchProduct() {
  const spinner = document.getElementById("sub-spin-edit");
  const searchicon = document.getElementById("sub-txt-edit");
  const message = document.getElementById("warning");
  const editdiv = document.getElementById("edititem-details");
  const productId = document.getElementById("product-id-input").value.trim();

  document
    .getElementById("BestsellerSwitcher")
    .addEventListener("change", function () {
      if (this.checked) {
        this.setAttribute("bestseller", "true");
        console.log("Best seller attribute set to true");
      } else {
        this.setAttribute("bestseller", "false");
        console.log("Best seller attribute set to false");
      }
    });

  // Show the spinner
  spinner.classList.remove("hidden");
  searchicon.classList.add("hidden");

  if (!productId) {
    editdiv.classList.add("hidden");
    Swal.fire({
      icon: "warning",
      text: "Please enter a product ID",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Hide the spinner after showing the warning
      spinner.classList.add("hidden");
      searchicon.classList.remove("hidden");
    });
    return;
  }

  try {
    const response = await fetch(
      `${url}/Stores/${uid}/Products/${productId}.json`
    );
    const data = await response.json();

    if (!data) {
      editdiv.classList.add("hidden");
      Swal.fire({
        icon: "info",
        text: "Product not found",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Hide the spinner after showing the info
        spinner.classList.add("hidden");
        searchicon.classList.remove("hidden");
      });
      return;
    }

    // Fill the form with the fetched data
    document.getElementById("producttitle-2").value =
      data["product-title"] || "";
    document.getElementById("brandname-2").value = data["Brand-Name"] || "";
    document.getElementById("productprice-2").value =
      data["Product-Price"] || "";
    document.getElementById("sale-amount-2").value = data["sale-amount"] || "";
    document.getElementById("category-2").value = data["category"] || "";
    document.getElementById("Piece-2").value = data["piece"] || "";
    document.getElementById("Type-2").value = data["type"] || "";
    document.getElementById("productdescription-2").value =
      data["product-description"] || "";
    document.getElementById("mainimg1").src =
      data["product-photo"] ||
      "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
    document.getElementById("mainimg2").src =
      data["product-photo2"] ||
      "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
    document.getElementById("mainimg3").src =
      data["product-photo3"] ||
      "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
    document.getElementById("mainimg4").src =
      data["product-photo4"] ||
      "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
    document.getElementById("mainimg5").src =
      data["product-photo5"] ||
      "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
    document.getElementById("mainimg6").src =
      data["product-photo6"] ||
      "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";

    // Set Bestseller Switcher
    const bestsellerSwitcher = document.getElementById("BestsellerSwitcher");
    if (data["bestseller"] === true) {
      bestsellerSwitcher.checked = true;
      bestsellerSwitcher.setAttribute("bestseller", "true");
    } else {
      bestsellerSwitcher.checked = false;
      bestsellerSwitcher.setAttribute("bestseller", "false");
    }

    const categorySelect = document.getElementById("category-2");
    const pieceSelect = document.getElementById("Piece-2");
    const typeSelect = document.getElementById("Type-2");

    categorySelect.value = data["category"] || "";

    calculateFinalPrice2();
    // Update the piece dropdown options and type based on the retrieved category and piece
    updatePieceOptions(categorySelect, pieceSelect, typeSelect);
    pieceSelect.value = data["piece"] || "";
    updateType(categorySelect, pieceSelect, typeSelect);

    // Add event listeners for category and piece change in the edit form
    categorySelect.addEventListener("change", () =>
      updatePieceOptions(categorySelect, pieceSelect, typeSelect)
    );
    pieceSelect.addEventListener("change", () =>
      updateType(categorySelect, pieceSelect, typeSelect)
    );

    const container = document.getElementById("input-container2");
    container.innerHTML = ""; // Clear previous entries

    const sizes = data["sizes"];
    let count = 0;
    for (const size in sizes) {
      for (const color in sizes[size]) {
        count++;
        const product = sizes[size][color];

        const newDiv = document.createElement("div");
        newDiv.classList.add(
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
        newDiv.id = `p${count}`;

        newDiv.innerHTML = `
          <div class="i-div align-items">
            <button type="button" style="border: none; margin-left:5px;margin-bottom: 0px;" class="formbold-form-label point toggle-expand2 cus-btn">
              <i class="bi bi-arrows-angle-contract"></i>
              <i class="bi bi-arrows-angle-expand none"></i>
            </button>
            <button type="button" style="border: none; margin-left:5px;margin-bottom:0px;" class="formbold-form-label point toggle-duplicate2 cus-btn">
              <i class="bi bi-copy"></i>
            </button>
            <button type="button" style="border: none; margin-left:auto" class=" point no-bg-i toggle-delete2 ml-auto cus-btn">
              <i class="bi bi-x-lg"></i>
            </button>
            <div class="flex center align-items ml-auto">
              <h5 class="mr-3 none" id="Quantity2">Quantity</h5>
              <h5 class="none" id="QuantityValue2">${product.qty}</h5>
            </div>
            <div class="flex center align-items ml-auto">
              <h5 class="mr-3 none" id="size2">Size</h5>
              <h5 class="none" id="sizevalue2">${size}</h5>
            </div>
            <div class="flex center align-items ml-auto">
              <label class="circle mr-3 none" id="Colorcircle2" style="background-color: ${product["color-value"]};"></label>
              <h5 class="color-value none" id="colorvalue2">${product["color-value"]}</h5>
            </div>
          </div>
          <div class="product-data" id="product-data2">
            <div class="flex mb-3">
              <input id="size2" type="text" name="size2" placeholder="Size" class="formbold-form-input m-LR-2" value="${size}">
              <input id="quantity2" type="text" name="quantity2" placeholder="Quantity" class="formbold-form-input m-LR-2" value="${product.qty}">
            </div>
            <div class="flex flex-wrap mb-3">
              <input type="text" id="img1_p${count}" name="product-photo2" placeholder="pic Url 1" class="formbold-form-input m-LR-2" value="${product.img1}">
              <input type="text" id="img2_p${count}" name="product-photo2-2" placeholder="pic Url 2" class="formbold-form-input m-LR-2" value="${product.img2}">
              <input type="text" id="img3_p${count}" name="product-photo2-3" placeholder="pic Url 3" class="formbold-form-input m-LR-2" value="${product.img3}">
              <input type="text" id="img4_p${count}" name="product-photo2-4" placeholder="pic Url 4" class="formbold-form-input m-LR-2" value="${product.img4}">
              <input type="text" id="img5_p${count}" name="product-photo2-5" placeholder="pic Url 5" class="formbold-form-input m-LR-2" value="${product.img5}">
              <input type="text" id="img6_p${count}" name="product-photo2-6" placeholder="pic Url 6" class="formbold-form-input m-LR-2" value="${product.img6}">
            </div>
            <div class="flex center flex-wrap mb-3">
              <div class="flex flex-column align-items">
                <div class="drop-zone" id="dropZone1_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
                  <img id="editimg1_p${count}" src="${product.img1}" onclick="triggerFileSelect2(this)">
                  <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
                </div>
              </div>
              <div class="flex flex-column align-items">
                <div class="drop-zone" id="dropZone2_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
                  <img id="editimg2_p${count}" src="${product.img2}" onclick="triggerFileSelect2(this)">
                  <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
                </div>
              </div>
              
            <div class="flex flex-column align-items">
              <div class="drop-zone" id="dropZone3_p${count}" ondragover="handleDragOve2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
                <img id="editimg3_p${count}" src="${product.img3}" onclick="triggerFileSelect2(this)">
                <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
              </div>
            </div>

            <div class="flex flex-column align-items">
              <div class="drop-zone" id="dropZone4_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
                <img id="editimg4_p${count}" src="${product.img4}" onclick="triggerFileSelect2(this)">
                <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
              </div>
            </div>

            <div class="flex flex-column align-items">
              <div class="drop-zone" id="dropZone5_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
                <img id="editimg5_p${count}" src="${product.img5}" onclick="triggerFileSelect2(this)">
                <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
              </div>
            </div>

            <div class="flex flex-column align-items">
              <div class="drop-zone" id="dropZone6_p${count}" ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
                <img id="editimg6_p${count}" src="${product.img6}" onclick="triggerFileSelect2(this)">
                <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
              </div>
            </div>

            </div>
            <div class="flex center mb-3 mt-12">
              <div class="color-input-wrapper m-LR-2">
                <div class="flex center align-items">
                  <input style="width:45px;" type="text" name="color2" class="formbold-form-input" value="${color}">
                  <input id="Color2" type="color" name="color-value2" class="color-picker" value="${product["color-value"]}">
                </div>
              </div>
              <input id="colorname2" type="text" name="color-name2" style="width: 50%;" placeholder="Black" class="formbold-form-input m-LR-2" value="${color}">
            </div>
          </div>
        `;

        container.appendChild(newDiv);
        setupToggleExpand2(newDiv.querySelector(".toggle-expand2"));
        setupDeleteButton2(newDiv.querySelector(".toggle-delete2"));
        setupDuplicateButton2(newDiv.querySelector(".toggle-duplicate2"));
        // setupFileInputHandlers2(count);
      }
    }

    editdiv.classList.remove("hidden");
    message.classList.add("hidden");
    searchicon.classList.remove("hidden");
    spinner.classList.add("hidden");
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      text: "An error occurred while fetching product data",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      spinner.classList.add("hidden");
      searchicon.classList.remove("hidden");
    });
  }
}

async function patchProduct() {
  const productId = document.getElementById("product-id-input").value.trim();

  // Get the current user
  const user = firebase.auth().currentUser;

  if (!user) {
    Swal.fire({
      title: "Authentication Required!",
      text: "You need to be signed in to update a product.",
      icon: "warning",
      confirmButtonText: "Okay",
      customClass: {
        container: "swal2-custom",
        title: "swal2-custom",
      },
    });
    return; // Exit if the user is not authenticated
  }

  if (!productId) {
    Swal.fire({
      icon: "warning",
      text: "Please enter a product ID",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  try {
    // Get the ID token of the authenticated user
    const idToken = await user.getIdToken();

    const productData = {
      "product-title": document.getElementById("producttitle-2").value,
      "Brand-Name": document.getElementById("brandname-2").value,
      "Product-Price": document.getElementById("productprice-2").value,
      "sale-amount": document.getElementById("sale-amount-2").value,
      category: document.getElementById("category-2").value,
      type: document.getElementById("Type-2").value,
      piece: document.getElementById("Piece-2").value,
      "product-description": document.getElementById("productdescription-2")
        .value,
    };
    // Check if BestsellerSwitcher is marked as "bestseller"
    const bestsellerSwitcher = document.getElementById("BestsellerSwitcher");
    if (bestsellerSwitcher.getAttribute("bestseller") === "true") {
      productData.bestseller = true; // Add bestseller to product data
    } else {
      productData.bestseller = false;
    }

    const inputContainer = document.getElementById("input-container2");
    const products = inputContainer.querySelectorAll(".product-record");
    const sizes = {};

    products.forEach((product) => {
      const size = product.querySelector('[name="size2"]').value;
      const qty = product.querySelector('[name="quantity2"]').value;
      const img1 = product.querySelector('[name="product-photo2"]').value;
      const img2 = product.querySelector('[name="product-photo2-2"]').value;
      const img3 = product.querySelector('[name="product-photo2-3"]').value;
      const img4 = product.querySelector('[name="product-photo2-4"]').value;
      const img5 = product.querySelector('[name="product-photo2-5"]').value;
      const img6 = product.querySelector('[name="product-photo2-6"]').value;
      const color = product.querySelector('[name="color-name2"]').value;
      const colorValue = product.querySelector('[name="color-value2"]').value;

      if (!sizes[size]) sizes[size] = {};
      sizes[size][color] = {
        qty,
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        "color-value": colorValue,
      };
    });

    productData["sizes"] = sizes;

    // Perform the PATCH request with the ID token
    const response = await fetch(
      `${url}/Stores/${uid}/Products/${productId}.json?auth=${idToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product");
    }

    Swal.fire({
      icon: "success",
      title: "Updated",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Hide the edit div and reset its content
      const editdiv = document.getElementById("edititem-details");
      editdiv.classList.add("hidden");
      document.getElementById("edit-product-form").reset();
      document.getElementById("input-container2").innerHTML = ""; // Clear dynamic fields
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      showConfirmButton: false,
      timer: 1500,
    });
    console.error(error);
  }
}

function triggerFileSelect2(dropZone) {
  const hiddenInput = dropZone.querySelector(".hidden-file-input");
  if (hiddenInput) {
    hiddenInput.click();
  } else {
  }
}

async function handleFileSelect2(event, dropZone) {
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
  const fileselect = `<input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">`;
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
      dropZone.innerHTML = `<img src="${imageUrl}" style="width: 100%; height: auto;">${fileselect}`;
      uploadStatus.innerHTML = `<p><i class="bi bi-check-circle-fill blue-check"></i></p>`;

      //   if (dropZoneId.includes("dropZone1")) {
      //     document.getElementById(`img1_${count}`).value = imageUrl;
      //   } else if (dropZoneId.includes("dropZone2")) {
      //     document.getElementById(`img2_${count}`).value = imageUrl;
      //   }
      // } else {
      //   uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${result.data.error}</p>`;
      const dropZoneNumber = dropZoneId.match(/\d+/)[0]; // This extracts the number from the dropZoneId
      if (dropZoneNumber >= 1 && dropZoneNumber <= 6) {
        document.getElementById(`img${dropZoneNumber}_${count}`).value =
          imageUrl;
      } else {
        uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${result.data.error}</p>`;
      }
    }
    dropZone.parentElement.appendChild(uploadStatus);
  } catch (error) {
    preloader.remove();
    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");
    uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${error.message}</p>`;
    dropZone.parentElement.appendChild(uploadStatus);
  }
}

function handleDragOver2(event, dropZone) {
  event.preventDefault();
  dropZone.classList.add("drag-over");
}

function handleDragLeave2(event, dropZone) {
  dropZone.classList.remove("drag-over");
}

async function handleDrop2(event, dropZone) {
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

  const fileselect = `<input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">`;

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
      dropZone.innerHTML = `<img src="${imageUrl}" style="width: 100%; height: auto;"> ${fileselect}`;

      uploadStatus.innerHTML = `<p><i class="bi bi-check-circle-fill blue-check"></i></p>`;

      //   if (dropZoneId.includes("dropZone1")) {
      //     document.getElementById(`img1_${count}`).value = imageUrl;
      //   } else if (dropZoneId.includes("dropZone2")) {
      //     document.getElementById(`img2_${count}`).value = imageUrl;
      //   }
      // } else {
      //   uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${result.data.error}</p>`;
      //   dropZone.parentElement.appendChild(uploadStatus);
      // }
      // dropZone.parentElement.appendChild(uploadStatus);
      const dropZoneNumber = dropZoneId.match(/\d+/)[0]; // Extract the number from dropZoneId

      if (dropZoneNumber >= 1 && dropZoneNumber <= 6) {
        document.getElementById(`img${dropZoneNumber}_${count}`).value =
          imageUrl;
      } else {
        const uploadStatus = document.createElement("div");
        uploadStatus.classList.add("upload-status");
        uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${result.data.error}</p>`;
        dropZone.parentElement.appendChild(uploadStatus);
      }

      // Append the upload status after processing
      dropZone.parentElement.appendChild(uploadStatus);
    }
  } catch (error) {
    preloader.remove();
    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");
    uploadStatus.innerHTML = `<p><i class="bi bi-x-circle-fill red-check"></i></p><p class="hidden">${error.message}</p>`;
    dropZone.parentElement.appendChild(uploadStatus);
  }
}

document.getElementById("add-more2").addEventListener("click", function () {
  const icon = document.getElementById("add-more-rotate2");
  icon.classList.add("rotate-icon");

  // Remove the class after the animation completes to allow re-adding on next click
  icon.addEventListener("animationend", () => {
    icon.classList.remove("rotate-icon");
  });

  const container = document.getElementById("input-container2");
  const newDiv = document.createElement("div");
  newDiv.classList.add(
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
  newDiv.id = `p${container.children.length + 1}`;

  newDiv.innerHTML = `
    <div class="i-div align-items">
      <button type="button" style="border: none; margin-left:5px;margin-bottom: 0px;" class="formbold-form-label point toggle-expand2 no-bg-i cus-btn">
        <i class="bi bi-arrows-angle-contract no-bg-i"></i>
        <i class="bi bi-arrows-angle-expand no-bg-i none"></i>
      </button>
      <button type="button" style="border: none; margin-left:5px;margin-bottom:0px;" class="formbold-form-label point toggle-duplicate2 cus-btn">
        <i class="bi bi-copy"></i>
      </button>
      <button type="button" style="border: none; margin-left:auto" class=" point no-bg-i toggle-delete2 ml-auto cus-btn">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="flex center align-items ml-auto">
        <h5 class="mr-3 none" id="Quantity2">Quantity</h5>
        <h5 class="none" id="QuantityValue2"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <h5 class="mr-3 none" id="size2">Size</h5>
        <h5 class="none" id="sizevalue2"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <label class="circle mr-3 none" id="Colorcircle2" style="background-color: ;"></label>
        <h5 class="color-value none" id="colorvalue2"></h5>
      </div>
    </div>
    <div class="product-data" id="product-data2">
      <div class="flex mb-3">
        <input id="size2" type="text" name="size2" placeholder="Size" class="formbold-form-input m-LR-2">
        <input id="quantity2" type="text" name="quantity2" placeholder="Quantity" class="formbold-form-input m-LR-2">
      </div>
      <div class="flex flex-wrap mb-3">
        <input type="text" id="img1_p${
          container.children.length + 1
        }" name="product-photo2" placeholder="pic Url 1" class="formbold-form-input m-LR-2">
        <input type="text" id="img2_p${
          container.children.length + 1
        }" name="product-photo2-2" placeholder="pic Url 2" class="formbold-form-input m-LR-2">
        <input type="text" id="img3_p${
          container.children.length + 1
        }" name="product-photo2-3" placeholder="pic Url 3" class="formbold-form-input m-LR-2">
         <input type="text" id="img4_p${
           container.children.length + 1
         }" name="product-photo2-4" placeholder="pic Url 4" class="formbold-form-input m-LR-2">
        <input type="text" id="img5_p${
          container.children.length + 1
        }" name="product-photo2-5" placeholder="pic Url 5" class="formbold-form-input m-LR-2">
        <input type="text" id="img6_p${
          container.children.length + 1
        }" name="product-photo2-6" placeholder="pic Url 6" class="formbold-form-input m-LR-2">
      </div>
      <div class="flex flex-wrap center mb-3">
        <div class="flex flex-column align-items"> 
          <div class="drop-zone" id="dropZone1_p${
            container.children.length + 1
          }" 
            ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" 
            ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
            <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>
            <img id="editimg1_p${
              container.children.length + 1
            }" onclick="triggerFileSelect2(this)">
            <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
          </div>
        </div>

        <div class="flex flex-column align-items">
          <div class="drop-zone" id="dropZone2_p${
            container.children.length + 1
          }" 
            ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" 
            ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
            <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>
            <img id="editimg2_p${
              container.children.length + 1
            }" onclick="triggerFileSelect2(this)">
            <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
          </div>
        </div>

        <div class="flex flex-column align-items">
          <div class="drop-zone" id="dropZone3_p${
            container.children.length + 1
          }" 
            ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" 
            ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
            <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>
            <img id="editimg3_p${
              container.children.length + 1
            }" onclick="triggerFileSelect2(this)">
            <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
          </div>
        </div>

        <div class="flex flex-column align-items">
          <div class="drop-zone" id="dropZone4_p${
            container.children.length + 1
          }" 
            ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" 
            ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
            <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>
            <img id="editimg4_p${
              container.children.length + 1
            }" onclick="triggerFileSelect2(this)">
            <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
          </div>
        </div>

        <div class="flex flex-column align-items">
          <div class="drop-zone" id="dropZone5_p${
            container.children.length + 1
          }" 
            ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" 
            ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
            <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>
            <img id="editimg5_p${
              container.children.length + 1
            }" onclick="triggerFileSelect2(this)">
            <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
          </div>
        </div>

        <div class="flex flex-column align-items">
          <div class="drop-zone" id="dropZone6_p${
            container.children.length + 1
          }" 
            ondragover="handleDragOver2(event, this)" ondragleave="handleDragLeave2(event, this)" 
            ondrop="handleDrop2(event, this)" onclick="triggerFileSelect2(this)">
            <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div>
            <img id="editimg6_p${
              container.children.length + 1
            }" onclick="triggerFileSelect2(this)">
            <input type="file" accept="image/*" class="hidden-file-input" onchange="handleFileSelect2(event, this.parentElement)">
          </div>
        </div>

      </div>
      <div class="flex center mb-3 mt-12">
        <div class="color-input-wrapper m-LR-2">
          <div class="flex center align-items">
            <input style="width:45px;" type="text" name="color2" class="formbold-form-input">
            <input id="Color2" type="color" name="color-value2" class="color-picker">
          </div>
        </div>
        <input id="colorname2" type="text" name="color-name2" style="width: 50%;" placeholder="Black" class="formbold-form-input m-LR-2">
      </div>
    </div>
  `;

  container.appendChild(newDiv);

  setupToggleExpand2(newDiv.querySelector(".toggle-expand2"));
  setupDeleteButton2(newDiv.querySelector(".toggle-delete2"));
  setupDuplicateButton2(newDiv.querySelector(".toggle-duplicate2"));
  updateElementIds2(container);
  // setupFileInputHandlers2(container.children.length);
});

//handling price after sale
const productPriceInput2 = document.getElementById("productprice-2");
const saleAmountInput2 = document.getElementById("sale-amount-2");
const finalPriceInput2 = document.getElementById("finalprice-2");

function calculateFinalPrice2() {
  const productPrice2 = parseFloat(productPriceInput2.value) || 0;
  const saleAmount2 = parseFloat(saleAmountInput2.value) || 0;

  const discount = productPrice2 * (saleAmount2 / 100);
  const finalPrice2 = productPrice2 - discount;

  finalPriceInput2.value = finalPrice2.toFixed(2);
}

productPriceInput2.addEventListener("input", calculateFinalPrice2);
saleAmountInput2.addEventListener("input", calculateFinalPrice2);

function setupToggleExpand2(button) {
  button.addEventListener("click", function () {
    const expandIcon = button.querySelector(".bi-arrows-angle-expand");
    const contractIcon = button.querySelector(".bi-arrows-angle-contract");
    const productData = button
      .closest(".input-set")
      .querySelector("#product-data2");
    const sizeLabel = button.closest(".i-div").querySelector("#size2");
    const QtyLabel = button.closest(".i-div").querySelector("#Quantity2");
    const ColorcircleLabel = button
      .closest(".i-div")
      .querySelector("#Colorcircle2");
    const sizevalue = button.closest(".i-div").querySelector("#sizevalue2");
    const colorvalue = button.closest(".i-div").querySelector("#colorvalue2");
    const Qtyvalue = button.closest(".i-div").querySelector("#QuantityValue2");

    const productRecord = button.closest(".product-record");
    const id = productRecord ? productRecord.id : null;

    if (id) {
      const productDiv = document.getElementById(id);
      const sizeInput = productDiv.querySelector("input#size2");
      const colorInput = productDiv.querySelector("input#Color2");
      const quantityInput = productDiv.querySelector("input#quantity2");
      const ColorcircleLabel = productDiv.querySelector("label#Colorcircle2");

      const size = sizeInput ? sizeInput.value : "";
      const color = colorInput ? colorInput.value : "";
      const Qty = quantityInput ? quantityInput.value : "";

      if (ColorcircleLabel) {
        ColorcircleLabel.style.backgroundColor = color;
      }

      sizevalue.innerText = size;
      colorvalue.innerText = color;
      Qtyvalue.innerText = Qty;
    }

    if (expandIcon.classList.contains("none")) {
      expandIcon.classList.remove("none");
      contractIcon.classList.add("none");
      productData.classList.add("none");
      sizeLabel.classList.remove("none");
      ColorcircleLabel.classList.remove("none");
      QtyLabel.classList.remove("none");
      sizevalue.classList.remove("none");
      colorvalue.classList.remove("none");
      Qtyvalue.classList.remove("none");
    } else {
      expandIcon.classList.add("none");
      contractIcon.classList.remove("none");
      productData.classList.remove("none");
      sizeLabel.classList.add("none");
      ColorcircleLabel.classList.add("none");
      QtyLabel.classList.add("none");
      sizevalue.classList.add("none");
      colorvalue.classList.add("none");
      Qtyvalue.classList.add("none");
    }
  });
}

function setupDeleteButton2(button) {
  button.addEventListener("click", function () {
    const container = document.getElementById("input-container2");

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
        updateElementIds2(container);
      }
    });
  });
}

function setupDuplicateButton2(button) {
  button.addEventListener("click", function () {
    const container = document.getElementById("input-container2");
    const original = button.closest(".product-record");
    const clone = original.cloneNode(true);

    container.appendChild(clone);
    updateElementIds2(container);

    setupToggleExpand2(clone.querySelector(".toggle-expand2"));
    setupDeleteButton2(clone.querySelector(".toggle-delete2"));
    setupDuplicateButton2(clone.querySelector(".toggle-duplicate2"));
    // setupFileInputHandlers2(container.children.length);
  });
}

function updateElementIds2(container) {
  const records = container.querySelectorAll(".product-record");
  records.forEach((record, index) => {
    const id = `p${index + 1}`;
    record.id = id;

    record.querySelectorAll("input").forEach((input) => {
      input.id = input.id.replace(/p\d+/, id);
    });

    record.querySelectorAll("img").forEach((img) => {
      img.id = img.id.replace(/p\d+/, id);
    });

    record.querySelectorAll(".drop-zone").forEach((dropZone) => {
      dropZone.id = dropZone.id.replace(/p\d+/, id);
    });
  });
}

//change the main images for the product which show first
// Function to handle file input change
function handleFileChange(event, imgId) {
  const file = event.target.files[0];
  if (file) {
    // Upload the image to Imgur and get the URL
    uploadImageToImgur(file)
      .then((imgUrl) => {
        // Update the image source with the new URL
        document.getElementById(imgId).src = imgUrl;

        // Call the function to update Firebase with new image URLs
        updateMainProductImages();
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }
}

// Function to handle updating main product images
async function updateMainProductImages() {
  const productId = document.getElementById("product-id-input").value.trim();

  // Get the current user
  const user = firebase.auth().currentUser;

  if (!user) {
    Swal.fire({
      title: "Authentication Required!",
      text: "You need to be signed in to update product images.",
      icon: "warning",
      confirmButtonText: "Okay",
      customClass: {
        container: "swal2-custom",
        title: "swal2-custom",
      },
    });
    return; // Exit if the user is not authenticated
  }

  if (!productId) {
    Swal.fire({
      icon: "warning",
      text: "Please enter a product ID",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  // Get file inputs
  const fileInput1 = document.getElementById("fileInput1").files[0];
  const fileInput2 = document.getElementById("fileInput2").files[0];
  const fileInput3 = document.getElementById("fileInput3").files[0];
  const fileInput4 = document.getElementById("fileInput4").files[0];
  const fileInput5 = document.getElementById("fileInput5").files[0];
  const fileInput6 = document.getElementById("fileInput6").files[0];

  // Validate file inputs
  if (
    !fileInput1 &&
    !fileInput2 &&
    !fileInput3 &&
    !fileInput4 &&
    !fileInput5 &&
    !fileInput6
  ) {
    Swal.fire({
      icon: "warning",
      text: "Please select at least one image to upload",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  try {
    // Get the ID token of the authenticated user
    const idToken = await user.getIdToken();

    // Upload images to Imgur
    const imgUrl1 = fileInput1
      ? await uploadImageToImgur(fileInput1)
      : document.getElementById("mainimg1").src;
    const imgUrl2 = fileInput2
      ? await uploadImageToImgur(fileInput2)
      : document.getElementById("mainimg2").src;
    const imgUrl3 = fileInput3
      ? await uploadImageToImgur(fileInput3)
      : document.getElementById("mainimg3").src;
    const imgUrl4 = fileInput4
      ? await uploadImageToImgur(fileInput4)
      : document.getElementById("mainimg4").src;
    const imgUrl5 = fileInput5
      ? await uploadImageToImgur(fileInput5)
      : document.getElementById("mainimg5").src;
    const imgUrl6 = fileInput6
      ? await uploadImageToImgur(fileInput6)
      : document.getElementById("mainimg6").src;

    // Prepare data for Firebase
    const productData = {
      "product-photo": imgUrl1,
      "product-photo2": imgUrl2,
      "product-photo3": imgUrl3,
      "product-photo4": imgUrl4,
      "product-photo5": imgUrl5,
      "product-photo6": imgUrl6,
    };

    // Update Firebase with the ID token
    const response = await fetch(
      `${url}/Stores/${uid}/Products/${productId}.json?auth=${idToken}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update product images");
    }

    Swal.fire({
      icon: "success",
      title: "Images Updated",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      // Reset the file inputs
      document.getElementById("fileInput1").value = "";
      document.getElementById("fileInput2").value = "";
      document.getElementById("fileInput3").value = "";
      document.getElementById("fileInput4").value = "";
      document.getElementById("fileInput5").value = "";
      document.getElementById("fileInput6").value = "";
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Failed to Update Images",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

// Function to upload an image to Imgur and return the URL
function uploadImageToImgur(file) {
   // Your Imgur Client ID
  const formData = new FormData();
  formData.append("image", file);

  return fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: `Client-ID ${clientId}`,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data.data.link) // Returns the image URL
    .catch((error) => {
      console.error("Error uploading to Imgur:", error);
      throw error;
    });
}
//
