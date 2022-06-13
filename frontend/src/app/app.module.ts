import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ChartModule } from 'angular2-chartjs';

import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ApphttpInterceptor } from './http-interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserModalComponent } from './user/user-modal/user-modal.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GeneratePassComponent } from './user/generate-pass/generate-pass.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    HomeComponent,
    ProductComponent,
    UserComponent,
    UserProfileComponent,
    UserModalComponent,
    SignUpComponent,
    GeneratePassComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ChartModule,
    BrowserModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ApphttpInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
