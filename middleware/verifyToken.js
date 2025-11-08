import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    //Obtener el token mediante la cookie
    const token = req.cookies.access_token;
    //Manejo de error, Sí no hay token: retornará status 401
    if(!token) return res.status(401).send({auth:false, message: 'Token No Enviado'});
    //Si hay token, verificar su validez
    jwt.verify(token, process.env.ACCESS_SECRET, async(err, decoded)=>{
        //Manejo de error sí, la key no coincide
        if(err) return res.status(401).send({auth:false, message:'Token Invalido o Expirado'});
        //Sí todo sale bien, se envían los datos en formato JSON
        req.user = decoded;
        next();
    })
}
