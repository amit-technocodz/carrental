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

AllPriceList:any;


  ngOnInit() {
    this.GetAllPrice();
  }

GetAllPrice()
{
  debugger
  this._service.carrentalpriceservice.GetAllByPaging(this.page, this.perPage).subscribe((res:any)=>{
    debugger
    if(res.data!=null)
    {
     this.AllPriceList=res.data;
    }
  })
}


  Delete(cityId) {
    debugger;
    return this._service.carrentalpriceservice.Delete(cityId).subscribe(data => {
      this.SuccessToaster("Record delete successfully");
      this.GetAllPrice();
    });
  }

  goToPage(n: number): void {
    this.page = n;
    this.GetAllPrice();
  }

  nextPage(): void {
    this.page++;
    this.GetAllPrice();
  }

  prevPage(): void {
    this.page--;
    this.GetAllPrice();
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
