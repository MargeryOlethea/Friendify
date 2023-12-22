function formatDate(date) {
  // Ensure the input is a Date object
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }

  // Get the components of the date
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // Create the formatted string
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
}

module.exports = formatDate;
