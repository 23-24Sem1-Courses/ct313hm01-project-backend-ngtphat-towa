import { NextFunction, Request, Response, response } from "express";
import {
  parseAuthenticationToDTO,
  parseBodyToDTO,
  parseUserToDTO,
} from "../Dtos/common.dto";
import { LogInDTO, loginSchema } from "../Dtos/user/login.dto";
import { RegisterDTO, registerSchema } from "../Dtos/user/register.dto";
import { AuthenticationService } from "../services/authenticate.service";
import { LogInResponseDTO } from "../Dtos/user/login.respone.dto";

import {
  ValidateTokenDTO,
  validateTokenSchema,
} from "../Dtos/token/validate.dto";
import { UnauthorizedAccessErrorResponse } from "../common/api.error";
import { UserDTO, userSchema } from "../Dtos/user/user.dto";
import { Role } from "../enums/role.enum";

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

    const grantedUser = await authenticateService.validate(dto.token);

    if (grantedUser === null) {
      throw new UnauthorizedAccessErrorResponse();
    }

    req.body.user = {
      ...grantedUser,
    };
    req.body.userId = grantedUser.id;
    next();
  } catch (error) {
    next(error);
  }
};

const validateAdminRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uesrDTO = parseUserToDTO<UserDTO>(req, userSchema);
    const userRole = uesrDTO.role;
    if (userRole && userRole === Role.admin) {
      next();
    }
    throw new UnauthorizedAccessErrorResponse();
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
  validateAdminRole,
  validateToken,
  register,
  login,
  logout,
};
