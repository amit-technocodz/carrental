import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from "../app/shared/shared.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { AgencylayoutComponent } from './agencylayout/agencylayout.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AdminlayoutComponent,
    AgencylayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ToastrModule.forRoot(), // ToastrModule added
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
