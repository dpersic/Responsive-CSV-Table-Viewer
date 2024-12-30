document.getElementById("loadCSV").addEventListener("click", () => {
    const fileInput = document.getElementById("csvFile");
    const tableContainer = document.getElementById("tableContainer");
    const table = document.getElementById("csvTable");
  
    if (!fileInput.files.length) {
      alert("Please select a CSV file first!");
      return;
    }
  
    const file = fileInput.files[0];
  
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const data = results.data;
  
        // Provjeri je li DataTables već inicijaliziran
        if ($.fn.DataTable.isDataTable(table)) {
          $(table).DataTable().clear();  // Očisti podatke
          $(table).DataTable().destroy(); // Uništi instancu
          table.querySelector("thead").innerHTML = ""; // Resetiraj zaglavlje
          table.querySelector("tbody").innerHTML = ""; // Resetiraj tijelo
        }
  
        // Provjeri da li podaci postoje
        if (!data.length) {
          alert("CSV file is empty or invalid!");
          return;
        }
  
        // Kreiraj zaglavlje tablice
        const headers = Object.keys(data[0]);
        const theadRow = document.createElement("tr");
        headers.forEach(header => {
          const th = document.createElement("th");
          th.textContent = header;
          theadRow.appendChild(th);
        });
        table.querySelector("thead").appendChild(theadRow);
  
        // Popuni tablicu redovima
        data.forEach(row => {
          const tr = document.createElement("tr");
          headers.forEach(header => {
            const td = document.createElement("td");
            td.textContent = row[header] || ""; // Osiguraj prazan string ako je vrijednost null/undefined
            tr.appendChild(td);
          });
          table.querySelector("tbody").appendChild(tr);
        });
  
        // Inicijaliziraj DataTables
        $(table).DataTable({
          paging: true,
          searching: true,
          ordering: true,
          responsive: true
        });
  
        tableContainer.style.display = "block";
      },
      error: function (error) {
        console.error("Error parsing CSV:", error);
      },
    });
  });
  