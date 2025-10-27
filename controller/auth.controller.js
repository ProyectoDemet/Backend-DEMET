import { RegisterEmployee, findEmail, hashed, comparePassword } from "../service/auth.service.js";

const AuthController = {
    register : async(req, res) => {
        try {
            //Datos a Registrar del Empleado
            const {name, email, password, rol} = req.body;
            //Servicio de Hasheo de Password
            const hashedPass = await hashed(password);
            //Servicio de Registrar Empleado
            await RegisterEmployee(name, email, hashedPass, rol);
            //Enviar Respuesta
            return res.status(201).json({mensaje: "Registro Exitoso"})
        } catch (error) {
            console.log('Error en register.auth.controller: ', error)
            return res.status(400).json({error: error.sqlMessage})
        }
    }
}

export default AuthController;