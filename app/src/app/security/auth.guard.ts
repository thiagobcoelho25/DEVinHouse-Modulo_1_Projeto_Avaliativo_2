import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginServiceService } from "../services/login-service.service";

@Injectable({
    providedIn:'root'
})
export class AuthGuard implements CanActivate{

    constructor(private login_service: LoginServiceService, private route: Router){

    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        const token = this.login_service.getToken();

        //se nao exitir token
        //se o usuario nao possuir a permissao  
        if(token === null){
            this.route.navigate(['login'])
            return false;
        }
        return true;
    }


}