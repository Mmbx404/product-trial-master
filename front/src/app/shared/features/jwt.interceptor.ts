import {HttpInterceptorFn} from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = localStorage.getItem('token');
  const authReq = jwt ? req.clone({setHeaders: {Authorization: `Bearer ${jwt}`}}) : req;
  return next(authReq);
};
