import * as XLSX from "xlsx";
import type { Band } from "../types/Band";

export function exportarBandasExcel(bandas: Band[]) {
  const hoja = XLSX.utils.json_to_sheet(bandas);

  const libro = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(libro, hoja, "Bandas");

  XLSX.writeFile(libro, "bandcamp-collection.xlsx");
}

export function importarBandasExcel(
  archivo: File,
  callback: (bandas: Band[]) => void,
) {
  const lector = new FileReader();

  lector.onload = (e) => {
    try {
      const datos = e.target?.result;

      if (!datos) {
        return;
      }

      const libro = XLSX.read(datos, {
        type: "array",
      });

      const nombreHoja = libro.SheetNames[0];

      const hoja = libro.Sheets[nombreHoja];

      const bandasImportadas = XLSX.utils.sheet_to_json<Band>(hoja);

      callback(bandasImportadas);
    } catch (error) {
      console.error("Error importando Excel:", error);
    }
  };

  lector.readAsArrayBuffer(archivo);
}
