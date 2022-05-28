import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ConnectionComponent } from './connection/connection.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app.routing.module';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ApphttpInterceptor } from './http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ConnectionComponent,
    HomeComponent,
    ProductComponent,
    UserComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: ApphttpInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }