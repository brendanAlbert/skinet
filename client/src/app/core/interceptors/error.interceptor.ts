import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastr: ToastrService ) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error) {
                    if (error.status === 400) {
                        this.toastr.error(error.error.message, error.error.statusCode)
                    }
                    else if (error.status === 401) {
                        this.toastr.error(error.error.message, error.error.statusCode)
                    }
                    else if (error.status === 404) {
                        this.router.navigateByUrl('/not-found');
                    }
                    else if (error.status === 500) {
                        this.router.navigateByUrl('/server-error');
                    }
                }
                return throwError(error);
            })
        );
    }

}