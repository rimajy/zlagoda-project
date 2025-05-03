import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";

@Injectable()
export class RemoveSensitiveFieldsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(removeSensitiveFields),
    );
  }
}

function removeSensitiveFields(data: {[key: string]: any} | any[]): Object {
  if (Array.isArray(data)) {
    return data.map(removeSensitiveFields);
  }

  if (data && data.password_hash) {
    delete data.password_hash;
  }

  if (data && data.login) {
    delete data.login;
  }

  return data;
}
