import { NextFunction, Request, Response, response } from "express";
import { parseAuthenticationToDTO, parseBodyToDTO } from "../Dtos/common.dto";
import { LogInDTO, loginSchema } from "../Dtos/user/login.dto";
import { RegisterDTO, registerSchema } from "../Dtos/user/register.dto";
import { AuthenticationService } from "../services/authenticate.service";
import { LogInResponseDTO } from "../Dtos/user/login.respone.dto";

import {
  ValidateTokenDTO,
  validateTokenSchema,
} from "../Dtos/token/validate.dto";

const authenticateService: AuthenticationService = new AuthenticationService();

/** findAllUser */
const findAllUsers = (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "findAllUser", user: req.body.user });
};

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dto = parseAuthenticationToDTO<ValidateTokenDTO>(
      req,
      validateTokenSchema
    );

    const user = await authenticateService.validate(dto.token);

    req.body.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    /// Retrive and validate
    const dto = parseBodyToDTO<RegisterDTO>(req, registerSchema);

    const authToken = await authenticateService.register(dto);

    return res.status(200).json(authToken);
  } catch (err) {
    next(err);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({ message: "logout" });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dto = parseBodyToDTO<LogInDTO>(req, loginSchema);

    const authToken = await authenticateService.login(dto);
    const response: LogInResponseDTO = {
      status: "success",
      token: authToken?.token!,
      expireTime: authToken?.expiredTime,
      timestamp: authToken?.createdDate,
    };

    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export default {
  findAllUsers,
  validateToken,
  register,
  login,
  logout,
};
