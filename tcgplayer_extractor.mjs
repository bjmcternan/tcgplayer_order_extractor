document.body.style.border = "5px solid red";

// Select the first div with class 'container'
var orderTables = document.querySelectorAll('.orderTable'); // or you can use .container:nth-child(1)
var newTable = copyTableRowsToNewTable(orderTables);

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
      // Insert a row at the end of table
      var newRow = mergedTableBody.insertRow();

      // Create 4 cells
      var cellItems = newRow.insertCell();
      var cellDetail = newRow.insertCell();
      var cellPrice = newRow.insertCell();
      var cellQuantity = newRow.insertCell();
      
      // Copy content
      cellItems.innerHTML = cells[0].innerHTML;//.replace(/\s/g, '');
      cellDetail.innerHTML = cells[1].innerHTML;//.replace(/\s/g, '');
      cellPrice.innerHTML = cells[2].innerHTML;//.replace(/\s/g, '');
      cellQuantity.innerHTML = cells[3].innerHTML;//.replace(/\s/g, '');

      // Clone the row and append to the merged table
      mergedTableBody.appendChild(newRow);
    }
  });

  return newTable;
}


function GetData()
{
  return newTable;
}