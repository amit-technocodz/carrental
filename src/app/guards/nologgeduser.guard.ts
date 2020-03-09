import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from "@angular/router";
import { Injectable } from "@angular/core"
import { SessionManagement } from "../session-management";
import { AppConfig } from "../app.config";
@Injectable({
    providedIn: 'root'
})
export class NoLoggedUserGuard implements CanActivate {
    constructor(private _router: Router) {

    }
    canActivate() {
        //debugger
        var user = SessionManagement.GetUser();
        if (user == null) {
            return true;
        }
        else {
            if (user.RoleId == AppConfig.Role.Admin)
                this._router.navigateByUrl("/admin");
            if (user.RoleId == AppConfig.Role.User)
                this._router.navigateByUrl("/user/profile");
            return false;
        }

    }
}