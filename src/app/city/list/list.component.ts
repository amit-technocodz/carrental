import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import{service} from '../../services/service';
import { Country } from 'src/app/models/classes/country';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
}) 
export class ListComponent implements OnInit {
  allcities: any[];
  allCountries: Country[]; 
 
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

  ngOnInit() {
    this.GetAllCities();
    this.GetAllCountries();
  }

  GetAllCities() {
    debugger;
    this._service.cityservice.GetAllByPaging(this.page, this.perPage).subscribe((result: any) => {
      debugger;
      this.count = result.count;
      this.allcities = result.data;
    });
  } 

  GetAllCountries() {
    return this._service.countryservice.GetAll().subscribe((result: any) => {
      this.allCountries = result.data;
    });
  }


  GetCitiesByCountry(SelectedCountry) {
    debugger;
    let countryId = SelectedCountry.target.value;
    if (countryId == 0) {
      this.GetAllCities();
    }
    else {
      return this._service.cityservice.GetCitiesByCountry(countryId).subscribe((result: any) => {
        debugger
        this.allcities=[]
        result.forEach(element => {
          debugger
          this.allcities.push(element)
          
        });
      });
    }
  }
  Delete(cityId) {
    debugger;
    return this._service.cityservice.Delete(cityId).subscribe(data => {
      this.SuccessToaster("Record delete successfully");
      this.GetAllCities();
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
