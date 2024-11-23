import { inject } from "@angular/core"
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router";

export const LoggedUser = () =>{
    const authService: AuthService = inject(AuthService);
    const router: Router = inject(Router);
    if(authService.user){
        return true;
    } else{
        router.navigate(['/login']);
        return false;
    }
}