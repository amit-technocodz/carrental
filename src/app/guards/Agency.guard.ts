import { CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core"
import { SessionManagement } from "../session-management";
import { AppConfig } from "../app.config";
@Injectable({
    providedIn: 'root'
})
export class AgencyAuthGuard implements CanActivateChild {
    constructor(private router: Router) {

    }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //debugger
        var user = SessionManagement.GetUser();
        if (user == null) {
            this.router.navigateByUrl("/");
            return false;
        }
        else {
            if (user.RoleId == AppConfig.Role.Agency) {
                return true;
            }
            else {
                if (user.RoleId == AppConfig.Role.Agency)
                    this.router.navigateByUrl("/agency");
                if (user.RoleId == AppConfig.Role.User)
                    this.router.navigateByUrl("/agency/profile");
                return false;
            }
        }

    }
}
