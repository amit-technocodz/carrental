import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent implements OnInit {

  constructor(
    
    @Inject(MAT_DIALOG_DATA)
    private _data: any,
    private _dailogRef: MatDialogRef<DeleteConfirmationComponent>,


  ) { }

  ngOnInit() { 
  }
  public decline() {
    this._dailogRef.close(false);
  }

  public accept() {
    this._dailogRef.close(true);
  }

}
