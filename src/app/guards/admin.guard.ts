import { CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core"
import { SessionManagement } from "../session-management";
import { AppConfig } from "../app.config";
@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivateChild {
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
            if (user.RoleId == AppConfig.Role.Admin) {
                return true;
            }
            else {
                if (user.RoleId == AppConfig.Role.Admin)
                    this.router.navigateByUrl("/admin");
                if (user.RoleId == AppConfig.Role.User)
                    this.router.navigateByUrl("/user/profile");
                return false;
            }
        }

    }
}
