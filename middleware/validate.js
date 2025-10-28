
//Funcion de Validacion de Schemas
export const validateSchema = (schema) => {
    return (req, res, next) => {
        try {
            const match = schema.safeParse(req.body);
            if(!match.success) return res.status(400).json(match.error.message);
            next(); 
        } catch (error) {
            return res.status(500).json({error: error})
        }
    }
}
