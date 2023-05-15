import { authenticateToken } from "../utils/jwt.js";

const authenticationMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;

    const payload = await authenticateToken(token);
    if (!payload) {
        throw { status: 401, message: "token inválido" };
    }

    res.locals.payload = payload;

    // Capturando o ID do usuário da sessão
    const userId = payload.userId;
    console.log("ID do usuário da sessão:", userId);

    next();
}

export default authenticationMiddleware;