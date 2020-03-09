import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import{service} from '../../services/service';
import {passwordMatch} from '../../validators/passwordMatch.validator';
import {EmailExistValidator} from '../../validators/emailExist.validator';
import { User } from 'src/app/models/user';
import {Data} from 'src/app/models/data';
import { UserProfile } from 'src/app/models/user-profile';
import { SessionManagement } from 'src/app/session-management';
var $:any; 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 

  constructor(    private _service: service,
    private toastr: ToastrService,
    private _router: Router,
    private http:HttpClient,
    private route:ActivatedRoute) { }


  registerForm: FormGroup;
  loginForm: FormGroup;
  buttonDisabled: boolean = false;
  Customer: boolean = true;
  Vendor: boolean = false;
  CheckRoleId:number;
  ipAddress:any;
  Id:number;
  TabId:any="1";

  ngOnInit() {
    debugger
    if(this.route.snapshot.queryParamMap.get("tab"))
    {
      this.TabId=null;
      this.TabId=this.route.snapshot.queryParamMap.get("tab");
    }

    this.loginForm = new FormGroup({
      'Email': new FormControl('', [Validators.required, Validators.email]),
      'Password': new FormControl('', [Validators.required])
    });   

    this.registerForm = new FormGroup({

      'Email': new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)], [this.ValidateEmail.bind(this)]),
      'Password': new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*?[a-z])(?=.*?[0-9])/)
      ]),
      'AgencyId': new FormControl(''),
      'ConfirmPassword': new FormControl('', [Validators.required]),
      'IsTermAccepted': new FormControl(false),
      'RoleId': new FormControl(2),
      'UserProfile': new FormGroup({
        'FirstName': new FormControl('', [Validators.required]),
        'LastName': new FormControl('', [Validators.required]),
      }),
    }, passwordMatch);
  }

  ValidateEmail(formcontrol: FormControl) {
    return EmailExistValidator.validate(formcontrol, 0, this._service.userservice);
  }

  Login(model: any) {
    for(let i in this.loginForm.controls)
    this.loginForm.controls[i].markAsTouched();

    this.loginForm.controls['Email'];
    this.loginForm.controls['Password'];
    if (!this.loginForm.valid) {
      this.LoginFormValidationMessage();
      return false;
    }
    debugger
    //this.UpCouter();
    this._service.userservice.Login (model).subscribe((data: Data<User>) => {
      debugger
      if (data.returnCode == 0) {
        SessionManagement.SetUser(data.data);
        if (data.data.IsBlocked==true) {
          this.ErrorToaster("User Is blocked")
        }
        else{
          this._router.navigate(['/']);
        }
      } else {
        this.ErrorToaster(data.returnMessage);
      }
    });
  }

  Register(user: User) {
    debugger
    if(this.registerForm.valid)
    {
      user.UserProfile.FirstName=user.UserProfile.FirstName;
    user.UserProfile.LastName = user.UserProfile.LastName;
    user.UserProfile.ProfilePicPath = '/assets/img/default-user.png';
    user.UserProfile.IsActive = true;
    user.IsActive = true;
    user.AgencyId=null;
    user.IsEmailVerified = false;
    user.Code = null;
    user.Token = null;
    user.IsBlocked = false;
    user.CreatedOn = new Date();
      this._service.userservice.Add(user).subscribe((data: any) => {
        debugger
        if (data.returnCode == 0) {
          this.registerForm.reset();
          this.SuccessToaster('User registration successfully. we have sent you an email to verify your email address');
          this.TabId="null";
          this.TabId="1";
        } else {
          alert(data.returnMessage);
        }
        
      });

    }
    else
    {
      this.RegisterFormValidationMessage();
    }
    
      
  }

  LoginFormValidationMessage() {
    this.toastr.clear();
    if (this.loginForm.controls['Password'].hasError('required')) {
      this.ErrorToaster('Please enter password');
    }

    if (this.loginForm.controls['Email'].hasError('required')) {
      this.ErrorToaster('Please enter email address');
    } else {
      if (this.loginForm.controls['Email'].hasError('email')) {
        this.ErrorToaster('Please enter valid email');
      }
    }
  }

  RegisterFormValidationMessage() {

    debugger

    this.toastr.clear();
    const UserProfile: any = this.registerForm.controls['UserProfile'];
    if (this.registerForm.controls['ConfirmPassword'].hasError('required')) {
      this.ErrorToaster('Please enter confirm password');
    } else {
      if (this.registerForm.controls['ConfirmPassword'].hasError('mismatch')) {
        this.ErrorToaster('Confirm password not matched');
      }
    }

    // password feild validation message
    if (this.registerForm.controls['Password'].hasError('required')) {
      this.ErrorToaster('Please enter password');
    } else {
      if (this.registerForm.controls['Password'].hasError('pattern')) {
        this.ErrorToaster('Password should contain one upper, one lower,one number  and minimum length is 8 to 12');
      }
    }

    // Email feild validation message
    if (this.registerForm.controls['Email'].hasError('required')) {
      this.ErrorToaster('Please enter email address');
    } else {
      if (this.registerForm.controls['Email'].hasError('pattern')) {
        this.ErrorToaster('Please enter valid email');
      } else {
        if (this.registerForm.controls['Email'].hasError('exist')) {
          this.ErrorToaster('User already exist');
        }
      }
    }

    // first name validation message
    if (UserProfile.controls['FirstName'].hasError('required')) {
      this.ErrorToaster('Please enter your name');
    }

    if (UserProfile.controls['LastName'].hasError('required')) {
      this.ErrorToaster('Please enter your last name');
    }
  }

  ErrorToaster(message) {
    this.toastr.error(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }
  SuccessToaster(message) {
    this.toastr.success(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }

  tab(id)
  {
    debugger
    if(id==1)
    {
      this.TabId="1";
    }
    else
    {
      this.TabId="2";
    }
  }



}
