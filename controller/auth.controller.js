import { RegisterEmployee, findEmail, hashed, comparePassword, generateAccessToken } from "../service/auth.service.js";

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
            console.log('Error en register.auth.controller: ', error)
            return res.status(400).json({error: error})
        }
    },
    login: async(req, res) => {
        try {
            //Datos a Necesitar
            const {email, password} = await req.body;
            //Servicio de Busqueda de Datos Segun Email
            const employeeData = await findEmail(email)
            console.log(employeeData)
            //Verificar Resultado de la Busqueda
            if(!employeeData) return res.status(401).json({message : "Usuario No Encontrado"})
            //Servicio Comparar Contrasenhas
            const match = await comparePassword(password, employeeData.password)
            //Verificar Resultado de la Comparacion
            if(!match) return res.status(401).json({message: "Contraseña Incorrecta"})
            //Servicio de Generacion de Token
            const token = generateAccessToken(employeeData)
            //Envío de Token Mediante una Cookie
            res.cookie("access_token", token);
            //Reporte de Acceso Exitoso
            return res.status(200).send({auth: true, token : token})
        } catch (error) {
            console.log('Error en login.auth.controller: ', error)
            return res.status(400).json({error: error})
        }
    }
}

export default AuthController;