import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(
    
    @Inject(MAT_DIALOG_DATA)
  private _data: any,
  private _dailogRef: MatDialogRef<ConfirmationDialogComponent>,
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
