import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      console.log('拦截器之前')
        return next.handle().pipe(map(item => {
             console.log('拦截器之后',item)
            return item
        }));
  }
}
