
import { UserContextService } from "../services/user-context.service";
import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from "@angular/router";
import { Router } from "@angular/router";


export const protectedRouteGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    console.log(inject(UserContextService).isAuthenticated);
    return inject(UserContextService).isAuthenticated ? true : inject(Router).createUrlTree(['/login']);
};


