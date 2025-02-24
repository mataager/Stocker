// Function to get the current date and time in "DD/MM/YYYY HH:MM AM/PM" format
function getCurrentDateTime() {
  const now = new Date();
  return now.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
