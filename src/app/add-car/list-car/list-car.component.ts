import { Component, OnInit } from '@angular/core';
import{service} from '../../services/service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';


@Component({
  selector: 'app-list-car',
  templateUrl: './list-car.component.html',
  styleUrls: ['./list-car.component.css']
})

export class ListCarComponent implements OnInit {
  ListCarType:any;
  constructor(private _service: service,private _router: Router,private dialog: MatDialog,private pubSub: NgxPubSubService) { 

    this.pubSub.subscribe('add-car', (data: any) => { 
      debugger
    //  this.ListCarType=[];
   //  this.Recall();
   this.ngOnInit();

     });
  }

  

  ngOnInit() {
    debugger
  this.Getalldata();

  }
  Recall()
  {
    debugger
     this._service.cartype.GetAll().subscribe( (res:any)=>{
    debugger
    if(res.data!=null)
    {
      this.ListCarType=  res.data;
    }
  })
}
  Getalldata()
  {
    debugger
     this._service.cartype.GetAll().subscribe( (res:any)=>{
    debugger
    this.ListCarType=[];
    
    if(res.data!=null)
    {
      this.ListCarType=  res.data;
    }
  })
}


  public openConfirmationDialog(Id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'This text is passed into the dialog!'
    });
    dialogRef.afterClosed().subscribe((data: any) => {
      debugger
      if (data == true) {
        this.DeteteCarType(Id)
      }
      else {

      }
    });

  }

  DeteteCarType(Id){
    this._service.cartype.delete(Id).subscribe((res:any)=>{
      this.ngOnInit();
    })
  }

}
