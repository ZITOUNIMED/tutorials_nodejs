import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class ApphttpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userId = sessionStorage.getItem('userId');
        return next.handle(req.clone({setHeaders:{'Set-Cookie': `userId=${userId}`} }));
    }
} 