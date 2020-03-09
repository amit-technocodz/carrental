import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _service:service
  ) { }
 //Paging variable
 requestCount = 0;
 count: number = 0;
 page: number = 1;
 perPage: number = 10;
 pagesToShow: number = 10;
 loading = false;

 alllocality:any;
 allcity:any


ngOnInit() {
 this.GetAllLocality();
 this.GetAllCities();
}

GetAllLocality() {
 debugger;
 this._service.localityservice.GetAllByPaging(this.page, this.perPage).subscribe((result: any) => {
   debugger;
   this.count = result.count;
   this.alllocality = result.data;
 });
}

GetAllCities() {
 return this._service.cityservice.GetAll().subscribe((result: any) => {
   this.allcity = result.data;
 });
}


getlocationbycity(SelectedCity) {
 debugger;
 let cityId = SelectedCity.target.value;
 if (cityId == 0) {
   this.GetAllCities();
 }
 else {
   return this._service.localityservice.GetlocationByCity(cityId).subscribe((result: any) => {
     debugger
     this.alllocality=[]
     result.forEach(element => {
       debugger
       this.alllocality.push(element)
       
     });
   });
 }
}
Delete(id) {
 debugger;
 return this._service.localityservice.Delete(id).subscribe(data => {
   this.SuccessToaster("Record delete successfully");
   this.GetAllLocality();
 });
}

// UpCounterRequest() {
//   this.requestCount++;
//   // tslint:disable-next-line:triple-equals
//   if (this.requestCount == 0) {
//     Loader.Hide();
//   } else {
//     Loader.Show();
//   }
// }
// DownCounterRequest() {
//   this.requestCount--;
//   // tslint:disable-next-line:triple-equals
//   if (this.requestCount == 0) {
//     Loader.Hide();
//   } else {
//     Loader.Show();
//   }
// }

goToPage(n: number): void {
 this.page = n;
 this.GetAllCities();
}

nextPage(): void {
 this.page++;
 this.GetAllCities();
}

prevPage(): void {
 this.page--;
 this.GetAllCities();
}

public openConfirmationDialog(Id: number) {

 const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
   data: 'This text is passed into the dialog!'
 });
 dialogRef.afterClosed().subscribe((data: any) => {
   debugger
   if (data == true) {
     this.Delete(Id)
   }
   else {

   }
 });

}

SuccessToaster(message) {
 this.toastr.clear();
 this.toastr.success(message, null, {
   timeOut: 5000,
   closeButton: false,
   positionClass: 'toast-top-center'
 });
}

}
