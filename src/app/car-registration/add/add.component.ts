import { Component, OnInit, ViewChild } from '@angular/core';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { service } from 'src/app/services/service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  @ViewChild(DropzoneComponent, null) componentRef?: DropzoneComponent;

  constructor(private _service: service, private toastr: ToastrService, private _router: Router, private route: ActivatedRoute) { }
  CarRegistration: FormGroup;
  Id: any;
  image: any = [];
  images = [];
  imageid = 0;
  SmallImagePath: any;
  LargeImagePath: any;
  ImagePath: any;
  UpdateImagePath: any;

  CarModel: any;
  CarType: any;
  AllVender: any;


  ngOnInit() {
    this.Id = this.route.snapshot.params.id;
    this.GetCarType();
    this.GetCarModel();
    this.GetVender();
    if (this.Id) {
      this.GetById()
    }
    this.CarRegistration = new FormGroup({
      CarTypeId: new FormControl('', Validators.required),
      VenderId: new FormControl('', Validators.required),
      CarModelId: new FormControl('', Validators.required),
      PlateNo: new FormControl('', Validators.required)
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
        const obj = {
          file: file,
          ImageName: filename,
          ImagePath: 'images/cartype/'
        }
        this._service.uploadImage.Save(obj).subscribe((res: any) => {
          debugger
          ImagePath = res.ImagePath;
          debugger
          this.image = res.file;
          this.SmallImagePath = res.SmallImagePath;
          this.LargeImagePath = res.LargeImagePath;
          this.UpdateImagePath=res.SmallImagePath;
          this.ImagePath = res.ImagePath;
          this.images.push({ Id: this.imageid++, ImageString: res.file, ImagePath: res.ImagePath, SmallImagePath: res.SmallImagePath, LargeImagePath: res.LargeImagePath });

        })

      }
    }
  }


  public resetDropzoneUploads(): void {
    this.image = [];
    this.componentRef.directiveRef.reset();
  }


  GetCarModel() {
    debugger

    this._service.carmodelservice.GetAll().subscribe((Res: any) => {
      if (Res != null) {
        this.CarModel = Res.data;
      }
    })

  }

  GetVender() {
    debugger
    this._service.userservice.GetAllVender().subscribe((data: any) => {
      if (data != null) {
        this.AllVender = data.data;
      }
    })

  }

  GetCarType() {
    debugger

    this._service.cartype.GetAll().subscribe((res: any) => {
      if (res != null) {
        this.CarType = res.data;
      }
    })

  }


  onSubmit() {
    debugger

    if (this.CarRegistration.valid) {
      debugger

      if(this.Id!=null)
      {
        var obj = {
          Name: this.CarRegistration.value.Name,
          CarTypeId: this.CarRegistration.value.CarTypeId,
          VenderId: this.CarRegistration.value.VenderId,
          CarModelId: this.CarRegistration.value.CarModelId,
          PlateNo: this.CarRegistration.value.PlateNo,
          ImageType: this.ImagePath,
          LargeImageType: this.LargeImagePath,
          SmallImageType: this.SmallImagePath,
        }

        this._service.carregistrationservice.Update(this.Id, obj).subscribe((ures: any) => {
          if (ures.data != null) {
            this.SuccessToaster("Updated Successfully");
            this._router.navigate(['/admin/carregistration']);
          }

        })

      }
      else
      {
        if(this.ImagePath!=null)
        {
          var obj = {
            Name: this.CarRegistration.value.Name,
            CarTypeId: this.CarRegistration.value.CarTypeId,
            VenderId: this.CarRegistration.value.VenderId,
            CarModelId: this.CarRegistration.value.CarModelId,
            PlateNo: this.CarRegistration.value.PlateNo,
            ImageType: this.ImagePath,
            LargeImageType: this.LargeImagePath,
            SmallImageType: this.SmallImagePath,
          }
          this._service.carregistrationservice.Add(obj).subscribe((res: any) => {
            if (res != null) {
              debugger
              this.SuccessToaster('CarType Saved Successfully');
              this._router.navigate(['/admin/carregistration']);
            }
          })

        }
        else
        {
          this.ErrorToaster("Plase Enter Image");
        }

      }
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


  ErrorMessage() {
    this.toastr.clear();
    if (this.CarRegistration.controls['CarTypeId'].hasError('required')) {
      this.ErrorToaster('Please Choose Car Type');
    }

    if (this.CarRegistration.controls['VenderId'].hasError('required')) {
      this.ErrorToaster('Please Choose Vender');
    }

    if (this.CarRegistration.controls['CarModelId'].hasError('required')) {
      this.ErrorToaster('Please Choose CarModel');
    }

    if (this.CarRegistration.controls['PlateNo'].hasError('required')) {
      this.ErrorToaster('Please enter Plate Number');
    }


  }

  GetById() {
    debugger
    this._service.carregistrationservice.GetById(this.Id).subscribe((data: any) => {
      if (data.data != null) {
        this.Binddata(data.data);

      }
    })
  }


  Binddata(model: any) {
    this.CarRegistration.get('CarTypeId').setValue(model.CarTypeId);
    this.CarRegistration.get('VenderId').setValue(model.VenderId);
    this.CarRegistration.get('PlateNo').setValue(model.PlateNo);
    this.CarRegistration.get('CarModelId').setValue(model.CarModelId);
    this.UpdateImagePath = model.SmallImageType;
  }


}
