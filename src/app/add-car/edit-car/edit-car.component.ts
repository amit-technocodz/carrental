import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';


@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {
  @ViewChild(DropzoneComponent,null) componentRef?: DropzoneComponent;

  constructor(private _service:service, private toastr:ToastrService,private _router: Router,private route:ActivatedRoute,private pubSub: NgxPubSubService) { }

  Id:any;
  CarTypeData:FormGroup;

  image:any=[];
  images = [];
  imageid = 0;

  SmallImagePath:any;
  LargeImagePath:any;
  ImagePath:any;
  UpdateImagePath:any;


  ngOnInit() {
    debugger
    this.Id=this.route.snapshot.params.id;
    this.CarTypeData=new FormGroup({
      Id:new FormControl(),
      Name:new FormControl('',[Validators.required])
    })
    this.GetById();
  }

  GetById()
  {
  
    debugger
    this._service.cartype.GetById(this.Id).subscribe((res:any)=>{
      if(res!=null)
      {
        this.BindData(res);
      }

    })

  }


  BindData(data)
  {

    this.CarTypeData.get('Name').setValue(data.Name);
    this.CarTypeData.get('Id').setValue(data.Id);
    this.UpdateImagePath=data.SmallImage;
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
          this.UpdateImagePath=res.SmallImagePath;
          this.LargeImagePath=res.LargeImagePath;
          this.ImagePath=res.ImagePath;
          this.images.push({ Id: this.imageid++, ImageString: res.file, ImagePath: res.ImagePath, SmallImagePath:res.SmallImagePath,LargeImagePath:res.LargeImagePath });
       
        })
       
      }
    }
  }

  public resetDropzoneUploads(): void {
    this.componentRef.directiveRef.reset();
  }

  onSubmit()
  {
    if(this.CarTypeData.valid)
    {
      if(this.UpdateImagePath)
      {
        var obj={
          Id:this.Id,
          Name:this.CarTypeData.value.Name,
          SmallImage:this.SmallImagePath,
          Image:this.ImagePath,
          LargeImage:this.LargeImagePath,
          IsActive:true
        }
    
        this._service.cartype.update(obj).subscribe((res:any)=>{
          if(res!=null)
          {
            this.pubSub.publishEvent('add-car',Date.now());
            this.SuccessToaster("Update successfully");
            
           this._router.navigate(['/admin/AddCarType'])
          }
        })

      }

      else
      {
        this.ErrorToaster("Enter Car Type Image");
      }
   

    }
    else
    {
      this.ErrorMessage();
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
    if (this.CarTypeData.controls['Name'].hasError('required')) {
      this.ErrorToaster('Please enter the Car Type Name');
    }
 
    
  }

  RemoveImages(data)
  {
    this.UpdateImagePath=null;
  }

}
