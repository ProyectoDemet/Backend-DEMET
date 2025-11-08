import express from "express"; 
import cors from 'cors';
import dotenv from 'dotenv';
import { swaggerDocs } from "./swagger.js";
import { swaggerSpec } from "./swagger.js";
import { apiReference } from '@scalar/express-api-reference'
import cookieParser from "cookie-parser";
import AuthRoutes from './routes/auth.routes.js';
import partnerRoutes from './routes/partner.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors());
// Middleware para interpretar JSON
app.use(express.json());
//Routes para Empleados
app.use('/intern', AuthRoutes);
//Routes para Gestion Socios
app.use('/partner/', partnerRoutes)

app.use('/reference', apiReference({
      spec: {
        content: swaggerSpec,
      },
    }),
)

swaggerDocs(app);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
