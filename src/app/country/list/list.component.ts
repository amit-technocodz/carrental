import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {service} from "../../services/service";
import {Country} from "../../models/classes/country";
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  allCountries: Country[];

  constructor(private _service:service ,private dialog: MatDialog ,private toastr:ToastrService) { }

  //Paging variable
  requestCount = 0;
  count: number = 0;
  page: number = 1;
  perPage: number = 10;
  pagesToShow: number = 10;
  loading = false;
  Search: string;

  ngOnInit() {
    this.GetAllCountries()
  }

  GetAllCountries() {
    //this.UpCounterRequest();
    this._service.countryservice.GetAllByPaging(this.page, this.perPage,this.Search).subscribe((result: any) => {
     debugger
      this.count = result.count;
      this.allCountries = result.data;
    });
    //this.DownCounterRequest();
  }

  Delete(countryId) {
    debugger;
    return this._service.countryservice.Delete(countryId).subscribe(data => {
      this.SuccessToaster('Record deleted successfully');
      this.GetAllCountries();
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
    this.GetAllCountries();
  }

  nextPage(): void {
    this.page++;
    this.GetAllCountries();
  }

  prevPage(): void {
    this.page--;
    this.GetAllCountries();
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
