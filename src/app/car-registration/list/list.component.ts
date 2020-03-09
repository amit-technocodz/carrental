import { Component, OnInit } from '@angular/core';
import { service } from 'src/app/services/service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  RegisterCardata:any;

  constructor(private _service:service, private toastr:ToastrService,private _router: Router,private route:ActivatedRoute,
    private dialog: MatDialog,) { }


   //Paging variable
   requestCount = 0;
   count: number = 0;
   page: number = 1;
   perPage: number = 10;
   pagesToShow: number = 10;
   loading = false;


  ngOnInit() {
    this.GetAllData();
  }




  GetAllData()
  {
    debugger
    this._service.carregistrationservice.GetAllByPaging(this.page, this.perPage).subscribe((data:any)=>{
      debugger

      if(data.data!=null)
      {
        this.RegisterCardata=data.data;
      }
    })

  }


  Delete(Id) {
    debugger;
    return this._service.carregistrationservice.Delete(Id).subscribe(data => {
      this.SuccessToaster("Record delete successfully");
      this.GetAllData();
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
    this.GetAllData();
  }

  nextPage(): void {
    this.page++;
    this.GetAllData();
  }

  prevPage(): void {
    this.page--;
    this.GetAllData();
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
