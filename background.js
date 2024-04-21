// background.js
/**** Import XLSX */
// Create a script element
var script = document.createElement('script');

// Set the source attribute to the URL of xlsx.mini.js
script.src = 'dist/xlsx.mini.js'; // Adjust the path

// Append the script element to the document head
(document.body || document.documentElement).prepend(script);

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
    SaveTable(newTable);
  }
});



function SaveTable(table){

  var jsonTable = tableToObj(table);

  console.log(jsonTable);

  // Create a new workbook
  var wb = XLSX.utils.book_new(ws);
  var ws = XLSX.utils.json_to_sheet(jsonTable);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Convert the workbook to a binary Excel file
  var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Trigger a file download
  var blob = new Blob([wbout], { type: 'application/octet-stream' });
  var url = URL.createObjectURL(blob);
  chrome.downloads.download({
      url: url,
      filename: 'table.xlsx',
      saveAs: true
  });
}

function tableToObj(table) {
  var trs = table.rows,
      trl = trs.length,
      i = 0,
      j = 0,
      keys = [],
      obj, ret = [];

  for (; i < trl; i++) {
      if (i == 0) {
          for (; j < trs[i].children.length; j++) {
              keys.push(trs[i].children[j].innerHTML);
          }
      } else {
          obj = {};
          for (j = 0; j < trs[i].children.length; j++) {
              obj[keys[j]] = trs[i].children[j].innerHTML;
          }
          ret.push(obj);
      }
  }
  
  return ret;
};

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