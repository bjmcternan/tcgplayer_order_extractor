document.body.style.border = "5px solid red";


// Select the first div with class 'container'
var orderTables = document.querySelectorAll('.orderTable'); // or you can use .container:nth-child(1)

var newTable = copyTableRowsToNewTable(orderTables);

console.log(newTable);

// Send collected data to background script
if (newTable) {
  // Send the merged table to the background script
  browser.runtime.sendMessage({ action: "sendTable", table: newTable.outerHTML }); 
}


// Function to collect table cells
function copyTableRowsToNewTable(orderTables) {
  var newTable = document.createElement('table');

  const mergedTableBody = document.createElement('tbody');
  newTable.appendChild(mergedTableBody);

  // Iterate over each table
  orderTables.forEach(table => {
    const rows = table.querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) {
      //Get all cells
      var cells = rows[i].getElementsByTagName("td");
      console.log(cells[0].innerHTML.trim().replace(/^(&nbsp;|\s)*/, ''))
      // Insert a row at the end of table
      var newRow = mergedTableBody.insertRow();

      // Create 4 cells
      var cellItems = newRow.insertCell();
      var cellDetail = newRow.insertCell();
      var cellPrice = newRow.insertCell();
      var cellQuantity = newRow.insertCell();
      
      // Copy content
      cellItems.textContent = cells[0].textContent;
      cellDetail.textContent = cells[1].textContent;
      cellPrice.textContent = cells[2].textContent;
      cellQuantity.textContent = cells[3].textContent;

      // Clone the row and append to the merged table
      mergedTableBody.appendChild(newRow);
    }
  });

  return newTable;
}
