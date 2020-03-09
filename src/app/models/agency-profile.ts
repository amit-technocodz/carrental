import { User } from "./user";

export class AgencyProfile{
    Id: number;
    AgencyId: number;
    Name: string;
    Phone: string;
    Description:string;
    LogoPath: string;
    CountryId: number;
    CityId: number;
    IsActive: boolean;
    User:User;
}