import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteconfirmation',
  templateUrl: './deleteconfirmation.component.html',
  styleUrls: ['./deleteconfirmation.component.css']
})
export class DeleteconfirmationComponent implements OnInit {

  constructor(
     
    @Inject(MAT_DIALOG_DATA)
    private _data: any,
    private _dailogRef: MatDialogRef<DeleteconfirmationComponent>,
  ) { 
    
    
  }

  ngOnInit() {
  }
  
  public decline() {
    this._dailogRef.close(false);
  }

  public accept() {
    this._dailogRef.close(true);
  }

}
   