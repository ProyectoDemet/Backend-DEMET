import { estimatedReportGet, reportGet } from "../service/report.service.js";
import { exportExcel } from "../service/excel.service.js";

export const reportController = {
    export : async(req, res) => {
        try {
            //Llamado a los Servicios de Obtencion de Reportes Provenientes de la base de datos
            const result = await reportGet();
            const estimatedResult = await estimatedReportGet();
            
            //Enviar todas las hojas en un solo archivo
            const reportExcel = await exportExcel([
                { data: result, sheetName: "Reporte" },
                { data: estimatedResult, sheetName: "Reporte_Estimado" }
            ]);
            //Indicar que es un archivo xlsx
            res.setHeader(
              "Content-Type",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            //Indicar que se debe Descargar
            res.setHeader(
              "Content-Disposition",
              "attachment; filename=report.xlsx"
            );
            //Buffer.from(reportExcel) -> Convertir ArrayBuffer en Buffer
            res.send(Buffer.from(reportExcel));

        } catch (error) {
            const status = error.statusCode || 500;
            return res.status(status).json({message: error.message});
        }
    }
}
