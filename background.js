// background.js

// Listen for messages from content script
browser.runtime.onMessage.addListener((message) => {
  if (message.action === "sendTable") {
    // Create a new temporary element to hold the table
    // Parse the table HTML string
    const parser = new DOMParser();
    const doc = parser.parseFromString(message.table, 'text/html');
    const table = doc.querySelector('table');

    // Create a new table element
    const newTable = document.createElement('table');

    // Iterate through each row of the parsed table
    table.querySelectorAll('tr').forEach(row => {
      const newRow = document.createElement('tr');
      // Iterate through each cell of the row
      row.querySelectorAll('td, th').forEach(cell => {
        const newCell = document.createElement(cell.tagName);
        newCell.textContent = cell.textContent; // Copy cell content
        newRow.appendChild(newCell);
      });
      newTable.appendChild(newRow);
    });

    // Now newTable holds a copy of the table, you can further process or use it as needed
    console.log(newTable);
  }
});





// function exportTableToExcel(table) {
//   var wb = XLSX.utils.table_to_book(table, {sheet:"Sheet1"});
//   XLSX.writeFile(wb, "table_data.xlsx");

//   // Create a link element and trigger a click event to download the CSV file
//   var encodedUri = encodeURI(wb);
//   var link = document.createElement("a");
//   link.setAttribute("href", encodedUri);
//   link.setAttribute("download", "table_data.csv");
//   document.body.appendChild(link);
//   link.click();
// }