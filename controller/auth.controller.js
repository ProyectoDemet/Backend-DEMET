import { decode } from "jsonwebtoken";
import { RegisterEmployee, findEmail, hashed, comparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken, getEmployees } from "../service/auth.service.js";

const AuthController = {
    register : async(req, res) => {
        try {
            //Datos a Registrar del Empleado
            const {name, email, password, rol} = await req.body;
            //Servicio de Hasheo de Password
            const hashedPass = await hashed(password);
            //Servicio de Registrar Empleado
            //Obtener False en caso de Errores
            const error = await RegisterEmployee(name, email, hashedPass, rol);
            //Verificador -> Sí es error es false
            if(error == false) return res.status(400).json({error: 'Email en Uso'})
            //Enviar Respuesta
            return res.status(201).json({mensaje: "Registro Exitoso"})
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },
    get : async(req, res) => {
        try {
            //Llamado al Servicio de Obtencion de Empleados
            const result = await getEmployees();
            //Retornar Respuesta
            return res.status(200).json({result : result})
        } catch (error) {
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    },
    login: async(req, res) => {
        try {
            //Datos a Necesitar
            const {email, password} = await req.body;
            //Servicio de Busqueda de Datos Segun Email
            const employeeData = await findEmail(email)
            //Verificar Resultado de la Busqueda
            if(!employeeData) return res.status(401).json({message : "Usuario No Encontrado"})
            //Servicio Comparar Contrasenhas
            const match = await comparePassword(password, employeeData.password)
            //Verificar Resultado de la Comparacion
            if(!match) return res.status(401).json({message: "Contraseña Incorrecta"})
            //Servicio de Generacion de Tokens
            const token = generateAccessToken(employeeData)
            const refreshToken = generateRefreshToken(employeeData)
            //Envío de Tokens Mediante una Cookies
            res.cookie("access_token", token);
            res.cookie("refresh_token", refreshToken);
            //Reporte de Acceso Exitoso
            return res.status(200).send({auth: true})
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },
    refresh : async(req, res) => {
        try {
            //Obtener el Refresh Token proveniente de la Cookie
            const refreshToken = req.cookies.refresh_token;
            //Validar Existencia del Refresh Token
            if(!refreshToken) return res.status(401).json({ message: "Refresh token no encontrado" }); 
            //Validar Integridad del Refresh Token
            const decoded = verifyRefreshToken(refreshToken);
            //Crear Payload 
            const payload = {id_employee: decoded.id_employee, rol: decoded.role};
            //Generar nuevo Access Token
            const token = generateAccessToken(payload);
            //Asignar token a una Cookie
            res.cookie("access_token", token);
            //Retornar Respuesta
            return res.status(200).send({message: "Access token renovado"})
        } catch (error) {
            return res.status(400).json({error: error})
        }
    },
    logout : async(req, res) => {
        try {
            //Limpiar las Cookies
            res.clearCookie("access_token");
            res.clearCookie("refresh_token");
            //Retornar Respuesta
            return res.status(200).send({message: "Sesión cerrada"})
        } catch (error) {
            return res.status(400).json({error: error})
        }
    }
}

export default AuthController;