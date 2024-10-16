import { Usuario } from "../entity/usuario.entity";

export interface LoginResponse {
    user : Usuario;
    token : string;
}