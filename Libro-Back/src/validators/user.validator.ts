import z from "zod";


export const createUserSchema = z.object({
    first: z
        .string()
        .min(3, "El nombre debe tener al menos 3 caracteres"),
    
    last: z
        .string()
        .min(3, "El apellido debe tener al menos 3 caracteres"),

    email: z
        .email("El correo electrónico no es válido"),

    password: z
        .string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
});