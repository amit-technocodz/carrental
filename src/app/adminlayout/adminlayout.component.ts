import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {

  constructor() { }
  Title: string = 'Dashboard';
  selectedIndex = 1;

  ngOnInit() {
  }

  AddClass(Id:number, pageName:string)
  {
    debugger
    this.Title = pageName;
    this.selectedIndex = Id;
    localStorage.setItem("SideBarActive", JSON.stringify(Id));
  }
}
