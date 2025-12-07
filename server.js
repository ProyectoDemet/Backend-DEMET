import express from "express"; 
import cors from 'cors';
import dotenv from 'dotenv';
import { swaggerDocs } from "./swagger.js";
import { swaggerSpec } from "./swagger.js";
import { apiReference } from '@scalar/express-api-reference'
import cookieParser from "cookie-parser";
import AuthRoutes from './routes/auth.routes.js';
import partnerRoutes from './routes/partner.route.js';
import spaceRoutes from './routes/space.routes.js';
import rateRoutes from './routes/rate.routes.js';
import extraRoutes from './routes/extra.route.js';
import reserveRoutes from './routes/reserve.routes.js';
import requestRoutes from './routes/request.route.js';
import reportRoutes from './routes/report.routes.js';
import logReserveRoutes from './routes/log_reserve.routes.js';

dotenv.config();

const app = express() || 3000;
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials:true
}));
// Middleware para interpretar JSON
app.use(express.json());
//Routes para Empleados
app.use('/intern', AuthRoutes);
//Routes para Gestion Socios
app.use('/partner/', partnerRoutes)
//Routes para Gestion Espacios
app.use('/space/', spaceRoutes)
//Routes para Gestion Tarifas
app.use('/rate/', rateRoutes)
//Routes para Gestion Extras
app.use('/extra/', extraRoutes)
//Routes para Gestion Reservas
app.use('/reserve/', reserveRoutes)
//Route para Gestion Resquest
app.use('/request/', requestRoutes)
//Route para Gestion Reportes
app.use('/report/', reportRoutes)
//Route para Gestions Historial Reservas
app.use('/log/reserve/', logReserveRoutes)

app.use('/reference', apiReference({
      spec: {
        content: swaggerSpec,
      },
    }),
)

swaggerDocs(app);

// Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
