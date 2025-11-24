import Exceljs from 'exceljs';
import { errorHandler } from '../util/errorHandler.js';

export const exportExcel = async (sheets) => {
    try {
        //Instanciar Clase Workbook
        const workBook = new Exceljs.Workbook();
        /*
        Iterar por cada Hoja de Excel
        data -> Informacion Proveniente de la base de datos
        sheetName -> Nombre de la Hoja Correspondiente
        */
        for (const { data, sheetName } of sheets) {
            const workSheet = workBook.addWorksheet(sheetName);
            //Validar Si hay datos
            if (!data || data.length === 0) {
                workSheet.addRow(["No hay datos"]);
                continue;
            }

            //Cabeceras de la Hoja
            workSheet.addRow(Object.keys(data[0]));

            //Filas de la Hoja
            data.forEach(row => {
                workSheet.addRow(Object.values(row));
            });
        }


        //Enviar el Archivo formato xlsx, y guardar en arrayBuffer
        return await workBook.xlsx.writeBuffer();

    } catch (error) {
        errorHandler(error);
    }
};
