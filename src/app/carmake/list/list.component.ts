import { Component, OnInit } from '@angular/core';
import { service } from 'src/app/services/service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteconfirmationComponent } from '../deleteconfirmation/deleteconfirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private _service:service ,private dialog: MatDialog ,private toastr:ToastrService) { }
  allCarMake:any;

//Paging variable
requestCount = 0;
count: number = 0;
page: number = 1;
perPage: number = 10;
pagesToShow: number = 10;
loading = false;
Search: string;

  ngOnInit() {
    this.GetAllCarMake()
  }

  GetAllCarMake()
  {
    this._service.carmakeservice.GetAllByPaging(this.page, this.perPage,this.Search).subscribe((result: any) => {
      debugger
       this.count = result.count;
       this.allCarMake = result.data;
     });
   }


   Delete(id) {
    debugger;
    return this._service.carmakeservice.Delete(id).subscribe(data => {
      this.SuccessToaster('Record deleted successfully');
      this.GetAllCarMake();
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
  //   tslint:disable-next-line:triple-equals
  //   if (this.requestCount == 0) {
  //     Loader.Hide();
  //   } else {
  //     Loader.Show();
  //   }
  // }

  goToPage(n: number): void {
    this.page = n;
    this.GetAllCarMake();
  }

  nextPage(): void {
    this.page++;
    this.GetAllCarMake();
  }

  prevPage(): void {
    this.page--;
    this.GetAllCarMake();
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
