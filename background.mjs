// background.js

import { GetData } from "./tcgplayer_extractor.mjs";

/**** Import XLSX */
// Create a script element
var script = document.createElement('script');

// Set the source attribute to the URL of xlsx.mini.js
script.src = 'dist/xlsx.mini.js'; // Adjust the path

// Append the script element to the document head
(document.body || document.documentElement).prepend(script);

var newTable = GetData()
var jsonTable = tableToObj(newTable);

// Save table
console.log(jsonTable);

// Create a new workbook
var wb = XLSX.utils.book_new(ws);
var ws = XLSX.utils.json_to_sheet(jsonTable);

// Add the worksheet to the workbook
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

// Convert the workbook to a binary Excel file
var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

// Trigger a file download
// Create a link element and trigger a click event to download the CSV file
var encodedUri = encodeURI(wbout);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "table_data.csv");
document.body.appendChild(link);
link.click();

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
