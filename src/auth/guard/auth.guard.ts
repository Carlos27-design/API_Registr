import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "../../shared/interface/jwt-payload";
import {AuthService} from "../auth.service";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService : JwtService, private authService : AuthService){}
    async canActivate(context : ExecutionContext): Promise<boolean>{
        const request=context.switchToHttp().getRequest()
        const token=this.extractContentHeader(request)
        if(!token) throw new UnauthorizedException('No hay token en la petición');
        try { 
        const payload=await this.jwtService.verifyAsync<JwtPayload>(token,{secret:process.env.JWT_SEEND})
        const user=await this.authService.findUserById(payload.id);
        if(!user) throw new UnauthorizedException('Usuario No Existe');
        if(!user.isActive) throw new UnauthorizedException('Usuario No Existe');
        request['user']=user
            
        } catch (error) {
            throw new UnauthorizedException();
        }
        return true;
    }
    private extractContentHeader(request : Request): string|undefined{
        const [type, token] = request.headers['authorization']?.split(' ') ?? [];
        return type==='Bearer' ? token:undefined;
    }
}