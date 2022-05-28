import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConnectionComponent } from './connection/connection.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AuthAdminGuard } from './services/auth-admin-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    { path: 'connection', component: ConnectionComponent },
    { path: 'products', component: ProductComponent, canActivate: [AuthGuard]},
    { path: 'users', component: UserComponent, canActivate: [AuthGuard, AuthAdminGuard]},
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full'}
]
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {enableTracing: true})
    ]
})
export class AppRoutingModule {

}