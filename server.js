import express from "express"; 
import cors from 'cors';
import dotenv from 'dotenv';
import { swaggerDocs } from "./swagger.js";
import { swaggerSpec } from "./swagger.js";
import { apiReference } from '@scalar/express-api-reference'
import cookieParser from "cookie-parser";
import AuthRoutes from './routes/auth.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cookieParser());
app.use(cors());
// Middleware para interpretar JSON
app.use(express.json());

app.use('/intern', AuthRoutes);

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
