import * as XLSX from "xlsx";

export const generateTableStateFromFile = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // Read the first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert to JSON matrix
      const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (rawData.length === 0) {
        return reject("Empty table data");
      }

      // Generate column keys and headers
      const headerRow = rawData[0];
      const columns = headerRow.map((label, index) => ({
        key: `key-${index}`,
        label: `<p>${label?.toString() || ""}</p>`
      }));

      // Generate rows
      const rows = rawData.slice(1).map((row) =>
        columns.map((col, i) => ({
          key: col.key,
          label: `${row[i]?.toString() || ''}`
        }))
      );

      resolve({ columns, rows });
    };

    reader.onerror = (err) => reject(err);
    console.log(file);
    
    reader.readAsArrayBuffer(file);
  });
};
