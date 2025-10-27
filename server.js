import express from "express"; 
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoutes from './routes/auth.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors())
// Middleware para interpretar JSON
app.use(express.json());

app.use('/intern', AuthRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Servidor backend con Node.js y Express funcionando! 🚀");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
