import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { DeleteConfirmationComponent } from 'src/app/carrental/delete-confirmation/delete-confirmation.component';

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

  RentalCarData:any;
    //Paging variable
    requestCount = 0;
    count: number = 0;
    page: number = 1;
    perPage: number = 10;
    pagesToShow: number = 10;
    loading = false;

  ngOnInit() {
    this.GetAllCarRental()
  }


  GetAllCarRental()
  {
    debugger
    this._service.carrental.GetAllByPaging(this.page, this.perPage).subscribe((res:any)=>{
      debugger
      if(res.data!=null)
      {
      
        this.count = res.count;
        this.RentalCarData=res.data

      }
    })
  }

  Delete(id) {
    debugger;
    return this._service.carrental.Delete(id).subscribe(data => {
      this.SuccessToaster("Record delete successfully");
      this.GetAllCarRental();
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
    this.GetAllCarRental();
  }

  nextPage(): void {
    this.page++;
    this.GetAllCarRental();
  }

  prevPage(): void {
    this.page--;
    this.GetAllCarRental();
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
