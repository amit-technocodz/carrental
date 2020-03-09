import { User } from './models/user';

export class SessionManagement {
    static SetUser(model: User) {
        window.localStorage.setItem('CurrentUser', JSON.stringify(model));
    }
    static GetUser(): User {
        return <User>JSON.parse(window.localStorage.getItem('CurrentUser'));
    }
    static SetDefaultCompany(id: string) {
        window.localStorage.setItem('DefaultCompany', id);
    }
    static GetDefaultCompany() {
        return window.localStorage.getItem('DefaultCompany');
    }

    static SetPaymentViewData(model:any)
    {
        window.localStorage.setItem('model',JSON.stringify(model))
    }

    static GetPaymentViewData()
    {
        return <User>JSON.parse(window.localStorage.getItem('model'));
    }
}
