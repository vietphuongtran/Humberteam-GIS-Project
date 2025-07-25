let table;

document.addEventListener("DOMContentLoaded", () => {
  const yearSlider = document.getElementById("yearSlider");
  const yearDisplay = document.getElementById("yearDisplay");

  if (yearSlider && yearDisplay) {
    yearSlider.addEventListener("input", () => {
      yearDisplay.textContent = yearSlider.value;
      filterPhase1Table();
    });
  }

  // === PHASE 1: Toronto Table ===
  if (document.getElementById("tabulator-table")) {
    Papa.parse("data/students.csv", {
      download: true,
      header: true,
      complete: function (results) {
        const data = results.data;
        window.originalPhase1Data = data;

        table = new Tabulator("#tabulator-table", {
          data,
          layout: "fitColumns",
          pagination: "local",
          paginationSize: 10,
          columns: [
            { title: "Year", field: "REF_DATE" },
            { title: "Institution", field: "GEO" },
            { title: "Field of Study", field: "Field of study" },
            { title: "Student Type", field: "Status of student in Canada" },
            { title: "Gender", field: "Gender" },
            { title: "Students", field: "VALUE", sorter: "number", hozAlign: "right" }
          ]
        });

        populateDropdown("yearFilter", [...new Set(data.map(d => d["REF_DATE"]))]);
        populateDropdown("institutionFilter", [...new Set(data.map(d => d["GEO"]))]);
        populateDropdown("genderFilter", [...new Set(data.map(d => d["Gender"]))]);

        document.getElementById("searchInput").addEventListener("input", filterPhase1Table);
        ["yearFilter", "institutionFilter", "genderFilter"].forEach(id => {
          document.getElementById(id)?.addEventListener("change", filterPhase1Table);
        });
      }
    });
  }

  // === ONTARIO TABLE ===
  if (document.getElementById("ontario-table")) {
    Papa.parse("data/data-1752857100457.csv", {
      download: true,
      header: true,
      complete: function (results) {
        const rawData = results.data;

        const data = rawData.filter(row =>
          row["ref_date"] &&
          row["education_data_name"] &&
          row["Field of study"] &&
          row["Program type"] &&
          row["gender"] &&
          row["value"] &&
          !isNaN(row["value"])
        );

        window.originalOntarioData = data;

        table = new Tabulator("#ontario-table", {
          data,
          layout: "fitColumns",
          pagination: "local",
          paginationSize: 10,
          columns: [
            { title: "Year", field: "ref_date" },
            { title: "Institution", field: "education_data_name" },
            { title: "Field of Study", field: "Field of study" },
            { title: "Program Type", field: "Program type" },
            { title: "Gender", field: "gender" },
            { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
          ]
        });

        populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
        populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
        populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
        populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

        document.getElementById("searchInput").addEventListener("input", filterOntarioTable);
        ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
          document.getElementById(id)?.addEventListener("change", filterOntarioTable);
        });
      }
    });
  }

  // === ALBERTA TABLE ===
  if (document.getElementById("alberta-table")) {
    Papa.parse("data/data-alberta.csv", {
      download: true,
      header: true,
      complete: function (results) {
        const rawData = results.data;
        const data = rawData.filter(row =>
          row["ref_date"] &&
          row["education_data_name"] &&
          row["Field of study"] &&
          row["Program type"] &&
          row["gender"] &&
          row["value"]
        );

        window.originalAlbertaData = data;

        table = new Tabulator("#alberta-table", {
          data,
          layout: "fitColumns",
          pagination: "local",
          paginationSize: 10,
          columns: [
            { title: "Year", field: "ref_date" },
            { title: "Institution", field: "education_data_name" },
            { title: "Field of Study", field: "Field of study" },
            { title: "Program Type", field: "Program type" },
            { title: "Gender", field: "gender" },
            { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
          ]
        });

        populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
        populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
        populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
        populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

        document.getElementById("searchInput").addEventListener("input", filterAlbertaTable);
        ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
          document.getElementById(id)?.addEventListener("change", filterAlbertaTable);
        });

        window.exportAlbertaCSV = function () {
          table.download("csv", "alberta_filtered.csv");
        };
      }
    });
  }

  // === BRITISH COLUMBIA TABLE ===
  if (document.getElementById("britishcolumbia-table")) {
    Papa.parse("data/data-1752890090710BC.csv", {
      download: true,
      header: true,
      complete: function (results) {
        const rawData = results.data;
        const data = rawData.filter(row =>
          row["ref_date"] &&
          row["education_data_name"] &&
          row["Field of study"] &&
          row["Program type"] &&
          row["gender"] &&
          row["value"]
        );

        window.originalBCData = data;

        table = new Tabulator("#britishcolumbia-table", {
          data,
          layout: "fitColumns",
          pagination: "local",
          paginationSize: 10,
          columns: [
            { title: "Year", field: "ref_date" },
            { title: "Institution", field: "education_data_name" },
            { title: "Field of Study", field: "Field of study" },
            { title: "Program Type", field: "Program type" },
            { title: "Gender", field: "gender" },
            { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
          ]
        });

        populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
        populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
        populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
        populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

        document.getElementById("searchInput").addEventListener("input", filterBC);
        ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
          document.getElementById(id)?.addEventListener("change", filterBC);
        });

        window.exportBC = function () {
          table.download("csv", "british_columbia_filtered.csv");
        };
      }
    });
  }
});

// === Filtering Functions ===

function filterPhase1Table() {
  const data = window.originalPhase1Data || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";
  const sliderYear = document.getElementById("yearSlider")?.value;

  const filtered = data.filter(row => {
    return (
      (!gender || row["Gender"] === gender) &&
      (!year || row["REF_DATE"] === year) &&
      (!institution || row["GEO"] === institution) &&
      (!sliderYear || row["REF_DATE"]?.includes(sliderYear)) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}

function filterOntarioTable() {
  const data = window.originalOntarioData || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}

function filterAlbertaTable() {
  const data = window.originalAlbertaData || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}

function filterBC() {
  const data = window.originalBCData || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}

// === Shared Export & Dark Mode ===

function exportCurrentTable() {
  if (table) {
    table.download("csv", "filtered_data.csv");
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

//Manitoba

document.addEventListener("DOMContentLoaded", () => {
  // === MANITOBA TABLE ===
  if (document.getElementById("manitoba-table")) {
    Papa.parse("data/data-1752890276139MB.csv", {
      download: true,
      header: true,
      complete: function (results) {
        const rawData = results.data;

        // Clean and filter valid rows
        const data = rawData.filter(row =>
          row["ref_date"] &&
          row["education_data_name"] &&
          row["Field of study"] &&
          row["Program type"] &&
          row["gender"] &&
          row["value"] &&
          !isNaN(row["value"])
        );

        // Save data globally for filtering
        window.originalMBData = data;

        // Initialize Tabulator table
        table = new Tabulator("#manitoba-table", {
          data,
          layout: "fitColumns",
          pagination: "local",
          paginationSize: 10,
          columns: [
            { title: "Year", field: "ref_date" },
            { title: "Institution", field: "education_data_name" },
            { title: "Field of Study", field: "Field of study" },
            { title: "Program Type", field: "Program type" },
            { title: "Gender", field: "gender" },
            { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
          ]
        });

        // Populate dropdown filters
        populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
        populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
        populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
        populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

        // Event listeners
        document.getElementById("searchInput").addEventListener("input", filterMB);
        ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
          document.getElementById(id)?.addEventListener("change", filterMB);
        });

        // Export button
        window.exportMB = function () {
          table.download("csv", "manitoba_filtered.csv");
        };
      }
    });
  }
});

// === FILTER FUNCTION ===
function filterMB() {
  const data = window.originalMBData || [];

  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}

// === POPULATE DROPDOWN UTILITY ===
function populateDropdown(id, items) {
  const dropdown = document.getElementById(id);
  if (!dropdown) return;

  const unique = [...new Set(items.map(item => String(item).trim()))].filter(Boolean);
  dropdown.innerHTML = `<option value="">All</option>`;
  unique.sort().forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    dropdown.appendChild(opt);
  });
}

// === DARK MODE TOGGLE ===
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// === NEW BRUNSWICK (NB) TABLE ===
if (document.getElementById("nb-table")) {
  Papa.parse("data/data-1752890752844NB.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const rawData = results.data;

      const data = rawData.filter(row =>
        row["ref_date"] &&
        row["education_data_name"] &&
        row["Field of study"] &&
        row["Program type"] &&
        row["gender"] &&
        row["value"] &&
        !isNaN(row["value"])
      );

      window.originalNBData = data;

      window.nbTabulator = new Tabulator("#nb-table", {
        data,
        layout: "fitColumns",
        pagination: "local",
        paginationSize: 10,
        columns: [
          { title: "Year", field: "ref_date" },
          { title: "Institution", field: "education_data_name" },
          { title: "Field of Study", field: "Field of study" },
          { title: "Program Type", field: "Program type" },
          { title: "Gender", field: "gender" },
          { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
        ]
      });

      populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
      populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
      populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
      populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

      document.getElementById("searchInput")?.addEventListener("input", filterNB);
      ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", filterNB);
      });

      window.exportNB = function () {
        window.nbTabulator.download("csv", "new_brunswick_filtered.csv");
      };
    }
  });
}

// === Filter for NB Table ===
function filterNB() {
  const data = window.originalNBData || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  window.nbTabulator.setData(filtered);
}

// === NOVA SCOTIA TABLE ===
if (document.getElementById("novascotia-table")) {
  Papa.parse("data/data-1752891438302NOVASCOTIA.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const rawData = results.data;
      const data = rawData.filter(row =>
        row["ref_date"] &&
        row["education_data_name"] &&
        row["Field of study"] &&
        row["Program type"] &&
        row["gender"] &&
        row["value"]
      );

      window.originalNovaScotiaData = data;

      table = new Tabulator("#novascotia-table", {
        data,
        layout: "fitColumns",
        pagination: "local",
        paginationSize: 10,
        columns: [
          { title: "Year", field: "ref_date" },
          { title: "Institution", field: "education_data_name" },
          { title: "Field of Study", field: "Field of study" },
          { title: "Program Type", field: "Program type" },
          { title: "Gender", field: "gender" },
          { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
        ]
      });

      populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
      populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
      populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
      populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

      document.getElementById("searchInput").addEventListener("input", filterNovaScotia);
      ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", filterNovaScotia);
      });

      window.exportNovaScotia = function () {
        table.download("csv", "novascotia_filtered.csv");
      };
    }
  });
}

// === Nova Scotia Table Filter ===
function filterNovaScotia() {
  const data = window.originalNovaScotiaData || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}
// === PRINCE EDWARD ISLAND TABLE ===
if (document.getElementById("pei-table")) {
  Papa.parse("data/data-1752891655344PRINCEEDWARDISLAND.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const rawData = results.data;
      const data = rawData.filter(row =>
        row["ref_date"] &&
        row["education_data_name"] &&
        row["Field of study"] &&
        row["Program type"] &&
        row["gender"] &&
        row["value"]
      );

      window.originalPEIData = data;

      table = new Tabulator("#pei-table", {
        data,
        layout: "fitColumns",
        pagination: "local",
        paginationSize: 10,
        columns: [
          { title: "Year", field: "ref_date" },
          { title: "Institution", field: "education_data_name" },
          { title: "Field of Study", field: "Field of study" },
          { title: "Program Type", field: "Program type" },
          { title: "Gender", field: "gender" },
          { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
        ]
      });

      populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
      populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
      populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
      populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

      document.getElementById("searchInput").addEventListener("input", filterPEI);
      ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", filterPEI);
      });

      window.exportPEI = function () {
        table.download("csv", "pei_filtered.csv");
      };
    }
  });
}

// === PEI Table Filter ===
function filterPEI() {
  const data = window.originalPEIData || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}
// === SASKATCHEWAN TABLE ===
if (document.getElementById("saskatchewan-table")) {
  Papa.parse("data/data-1752891941272Saskatchewan.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const rawData = results.data;
      const data = rawData.filter(row =>
        row["ref_date"] &&
        row["education_data_name"] &&
        row["Field of study"] &&
        row["Program type"] &&
        row["gender"] &&
        row["value"]
      );

      window.originalSaskData = data;

      table = new Tabulator("#saskatchewan-table", {
        data,
        layout: "fitColumns",
        pagination: "local",
        paginationSize: 10,
        columns: [
          { title: "Year", field: "ref_date" },
          { title: "Institution", field: "education_data_name" },
          { title: "Field of Study", field: "Field of study" },
          { title: "Program Type", field: "Program type" },
          { title: "Gender", field: "gender" },
          { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
        ]
      });

      populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
      populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
      populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
      populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

      document.getElementById("searchInput").addEventListener("input", filterSaskatchewan);
      ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", filterSaskatchewan);
      });

      window.exportSaskatchewan = function () {
        table.download("csv", "saskatchewan_filtered.csv");
      };
    }
  });
}

// === SASKATCHEWAN FILTER ===
function filterSaskatchewan() {
  const data = window.originalSaskData || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}
// === QUEBEC TABLE ===
if (document.getElementById("quebec-table")) {
  Papa.parse("data/data-1752891785993QUEBEC.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const rawData = results.data;
      const data = rawData.filter(row =>
        row["ref_date"] &&
        row["education_data_name"] &&
        row["Field of study"] &&
        row["Program type"] &&
        row["gender"] &&
        row["value"]
      );

      window.originalQuebecData = data;

      table = new Tabulator("#quebec-table", {
        data,
        layout: "fitColumns",
        pagination: "local",
        paginationSize: 10,
        columns: [
          { title: "Year", field: "ref_date" },
          { title: "Institution", field: "education_data_name" },
          { title: "Field of Study", field: "Field of study" },
          { title: "Program Type", field: "Program type" },
          { title: "Gender", field: "gender" },
          { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
        ]
      });

      populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
      populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
      populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
      populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

      document.getElementById("searchInput").addEventListener("input", filterQuebec);
      ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", filterQuebec);
      });

      window.exportQuebec = function () {
        table.download("csv", "quebec_filtered.csv");
      };
    }
  });
}

// === Quebec Filter ===
function filterQuebec() {
  const data = window.originalQuebecData || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}
// === YUKON TABLE ===
if (document.getElementById("yukon-table")) {
  Papa.parse("data/data-1752892086255YUKON.csv", {
    download: true,
    header: true,
    complete: function (results) {
      const rawData = results.data;
      const data = rawData.filter(row =>
        row["ref_date"] &&
        row["education_data_name"] &&
        row["Field of study"] &&
        row["Program type"] &&
        row["gender"] &&
        row["value"]
      );

      window.originalYukonData = data;

      table = new Tabulator("#yukon-table", {
        data,
        layout: "fitColumns",
        pagination: "local",
        paginationSize: 10,
        columns: [
          { title: "Year", field: "ref_date" },
          { title: "Institution", field: "education_data_name" },
          { title: "Field of Study", field: "Field of study" },
          { title: "Program Type", field: "Program type" },
          { title: "Gender", field: "gender" },
          { title: "Students", field: "value", sorter: "number", hozAlign: "right" }
        ]
      });

      populateDropdown("yearFilter", [...new Set(data.map(d => d["ref_date"]))]);
      populateDropdown("institutionFilter", [...new Set(data.map(d => d["education_data_name"]))]);
      populateDropdown("genderFilter", [...new Set(data.map(d => d["gender"]))]);
      populateDropdown("programFilter", [...new Set(data.map(d => d["Program type"]))]);

      document.getElementById("searchInput").addEventListener("input", filterYukon);
      ["yearFilter", "institutionFilter", "genderFilter", "programFilter"].forEach(id => {
        document.getElementById(id)?.addEventListener("change", filterYukon);
      });

      window.exportYukon = function () {
        table.download("csv", "yukon_filtered.csv");
      };
    }
  });
}

// === Yukon Filter ===
function filterYukon() {
  const data = window.originalYukonData || [];
  const gender = document.getElementById("genderFilter")?.value;
  const year = document.getElementById("yearFilter")?.value;
  const institution = document.getElementById("institutionFilter")?.value;
  const program = document.getElementById("programFilter")?.value;
  const search = document.getElementById("searchInput")?.value.toLowerCase().trim() || "";

  const filtered = data.filter(row => {
    return (
      (!gender || row["gender"] === gender) &&
      (!year || row["ref_date"] === year) &&
      (!institution || row["education_data_name"] === institution) &&
      (!program || row["Program type"] === program) &&
      Object.values(row).some(val => String(val).toLowerCase().includes(search))
    );
  });

  table.setData(filtered);
}
