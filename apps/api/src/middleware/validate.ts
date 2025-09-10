import type {RequestHandler} from "express";
import type {ZodTypeAny} from "zod";
import {z} from "zod";

export function validate<T extends ZodTypeAny>(schema: T, where: "body" | "query" | "params" = "body"): RequestHandler {
    return (req, res, next) => {
        const result = schema.safeParse(req[where]);
        if (!result.success) {
            return res.status(400).json({
                error: "Validation error",
                issues: z.treeifyError(result.error)
            })
        }
        res.locals[`validated_${where}`] = result.data; // Ponerle la version limpia
        next();
    }
}