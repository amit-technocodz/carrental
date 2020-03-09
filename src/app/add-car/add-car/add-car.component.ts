import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import{service} from '../../services/service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';




@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  @ViewChild(DropzoneComponent,null) componentRef?: DropzoneComponent;

  constructor( private _service:service, private toastr:ToastrService,private _router: Router,private pubSub: NgxPubSubService) { }
  CarTypeForm:FormGroup;
  image:any=[];
  images = [];
  imageid = 0;

  SmallImagePath:any;
  LargeImagePath:any;
  ImagePath:any;


  ngOnInit() {
    this.CarTypeForm=new FormGroup({
      'Name':new FormControl('',[Validators.required])
    })
  }

  imageUpload(event) {
    debugger
    let imgbase64 = null;
    let filename = null;
    let ImagePath = null;
    const reader = new FileReader();
    if (event[0].dataURL) {
      const file = event[0].dataURL;
      filename = event[0].name;
      if (event[0].type === 'image/png' || event[0].type === "image/jpeg" || event[0].type === "image/jpg" || event[0].type === "image/gif") {
        debugger
        const obj={
          file:file,
          ImageName:filename,
          ImagePath:'images/cartype/'
        }
        this._service.uploadImage.Save(obj).subscribe((res:any)=>{
          debugger
          ImagePath = res.ImagePath;
          debugger
          this.image = res.file;
          this.SmallImagePath=res.SmallImagePath;
          this.LargeImagePath=res.LargeImagePath;
          this.ImagePath=res.ImagePath;
          this.images.push({ Id: this.imageid++, ImageString: res.file, ImagePath: res.ImagePath, SmallImagePath:res.SmallImagePath,LargeImagePath:res.LargeImagePath });
       
        })
       
      }
    }
  }


  public resetDropzoneUploads(): void {
    this.image = [];
    this.componentRef.directiveRef.reset();
  }

  onSubmit()
  {
    debugger
 
    if(this.CarTypeForm.valid)
    {
      debugger
      if(this.ImagePath)
      {
        var obj={
          Name:this.CarTypeForm.value.Name,
          Image:this.ImagePath,
          LargeImage:this.LargeImagePath,
          SmallImage:this.SmallImagePath,
          IsActive:true
        }
    
        this._service.cartype.Create(obj).subscribe((res:any)=>{
          if(res!=null)
          {
            debugger
            this.pubSub.publishEvent('add-car',Date.now());
            this.SuccessToaster('CarType Saved Successfully');
            this._router.navigate(['/admin/AddCarType']);
          }
        })

      }
      else
      {
        debugger
        this.ErrorToaster("Enter the carType Image");
      }
     

    }

    else
    {
      this.ErrorMessage()

    }
   



  }

  SuccessToaster(message) {
    this.toastr.clear();
    this.toastr.success(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }

  ErrorToaster(message) {
    this.toastr.error(message, null, {
      timeOut: 5000,
      closeButton: false,
      positionClass: 'toast-top-center'
    });
  }


  ErrorMessage()
  {
    this.toastr.clear();
    if (this.CarTypeForm.controls['Name'].hasError('required')) {
      this.ErrorToaster('Please enter the Car Type');
    }
 
    
  }

 
}
