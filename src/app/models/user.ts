import { Role } from './role';
import { UserProfile } from './user-profile';
import { AgencyProfile } from './agency-profile';

export class User {
    Id: number;
    Email: string;
    Password: string;
    Token?: any;
    Code?: any;
    RoleId: number;
    IsBlocked: boolean;
    IsEmailVerified: boolean;
    IsActive: boolean;
    Role: Role;
    UserProfile: UserProfile;
    AgencyProfile: AgencyProfile;
    Phone: number;
    AgencyId: number;
    IsApproved: boolean;
    CreatedOn: Date;
    UpdatedOn: Date;
    CompanyName: string;
    EmailVerificationId:string;
}