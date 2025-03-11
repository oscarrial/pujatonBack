import { HttpException } from "../exceptions/httpException";
import { NextFunction, Request, Response } from "express";

export const ErrorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    try {
        // Verifica si las cabeceras ya han sido enviadas para evitar enviar múltiples respuestas
        if (res.headersSent) {
            return next(error); // Si las cabeceras ya fueron enviadas, pasa el error al siguiente middleware
        }

        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        res.status(status).json({ message });
    } catch (err) {
        next(err); // Si ocurre un error dentro del mismo middleware, pásalo al siguiente
    }
};
