import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { service } from 'src/app/services/service';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';

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
    allcarmake:any;
    allcarmodel:any;

  ngOnInit() {
    this.GetAllCarMake();
    this.GetAllCarModel();
  }
  

  GetAllCarMake()
  {
    debugger
    this._service.carmakeservice.GetAll().subscribe((res:any)=>{
      if(res!=null)
      {
        this.allcarmake=res.data;
      }
 
    })
  }

  GetAllCarModel()
  {
    debugger
    this._service.carmodelservice.GetAllByPaging(this.page, this.perPage).subscribe((res:any)=>{
      this.allcarmodel=res.data;
    })
  }

  Delete(id) {
    debugger;
    return this._service.carmodelservice.Delete(id).subscribe(data => {
      this.SuccessToaster("Record delete successfully");
      this.GetAllCarModel();
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
    this.GetAllCarModel();
  }

  nextPage(): void {
    this.page++;
    this.GetAllCarModel();
  }

  prevPage(): void {
    this.page--;
    this.GetAllCarModel();
  }

  public openConfirmationDialog(Id: number) {
    const dialogRef = this.dialog.open(DeleteconfirmationComponent, {
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
