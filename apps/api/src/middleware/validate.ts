import {RequestHandler} from "express";
import {ZodTypeAny} from "zod";
import {z} from "zod";

export function validate<T extends ZodTypeAny>(schema: T, where: "body" | "query" | "params" = "body"): RequestHandler {
    return (req, res, next) => {
        const result = schema.safeParse((req as any)[where]);
        if (!result.success) {
            return res.status(400).json({
                error: "Validation error",
                issues: z.treeifyError(result.error)
            })
        }
        (res.locals as any)[`validated_${where}`] = result.data; // Ponerle la version limpia
        next();
    }
}