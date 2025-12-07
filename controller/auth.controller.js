import { RegisterEmployee, updateEmployee, deleteEmployee, findEmail, hashed, comparePassword, generateAccessToken, generateRefreshToken, verifyRefreshToken, getEmployees, verifyAccessToken } from "../service/auth.service.js";

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
    update : async(req, res) => {
        try {
            //Datos a Actualizar del Empleado
            const {v_idEmployee, v_email, v_rol} = await req.body;
            //Servicio de Actualizar Empleado
            await updateEmployee(v_idEmployee, v_email, v_rol);
            //Enviar Respuesta
            return res.status(201).json({mensaje: "Update Exitoso"})
        } catch (error) {
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
        }
    },
    delete : async(req, res) => {
        try {
            //Datos para Eliminar Empleado
            const {v_idEmployee} = await req.body;
            //Servicio de Eliminar Empleado
            await deleteEmployee(v_idEmployee);
            //Enviar Respuesta
            return res.status(201).json({mensaje: "Delete Exitoso"})
        } catch (error) {
            //Obtener de error, el Status del Error, Sí no hubo dato existente, va a usar status(500)
            const status = error.statusCode || 500;
            //Retornar Error
            return res.status(status).json({message: error.message})
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
    me : async(req, res) => {
        try {
            //Retornar Rol de Usuario
            return res.status(201).json({role : req.user.role})
        } catch (error) {
            return res.status(400).json({error: error})
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