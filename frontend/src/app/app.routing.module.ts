import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConnectionComponent } from './connection/connection.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';

const routes = [
    { path: 'connection', component: ConnectionComponent },
    { path: 'products', component: ProductComponent },
    { path: 'users', component: UserComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: '', component: HomeComponent }
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {enableTracing: true})
    ]
})
export class AppRoutingModule {

}