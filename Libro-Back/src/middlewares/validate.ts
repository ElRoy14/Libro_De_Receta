
export const validate = (schema: any) => {

    return (req: any, res: any, next: any) => {
        try
        {
            req.body = schema.parse(req.body);

            next();
        }
        catch(error: any)
        {
            return res.status(400).json({
                message: "Datos invalidos",
                errors: error.issues
            });
        }
    };
};