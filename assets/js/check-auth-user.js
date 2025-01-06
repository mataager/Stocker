function checkUserAuthentication() {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "You must sign in first",
        text: "Please sign in to complete your order.",
        confirmButtonText: "Go to Account",
        allowOutsideClick: false, // Prevent closing by clicking outside
        allowEscapeKey: false, // Prevent closing with Escape key
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "./account.html"; // Redirect user to account page
        }
      });
    }
  });
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", checkUserAuthentication);
