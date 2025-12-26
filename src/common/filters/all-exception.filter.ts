import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import * as requestIp from 'request-ip'

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter {
    private readonly logger = new Logger()
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {

    }
    catch(exception: T, host: ArgumentsHost) { 
        const { httpAdapter } = this.httpAdapterHost;
        const context = host.switchToHttp()
        const req = context.getRequest()
        const resp = context.getResponse()

        const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

        const msg:unknown = exception[
            'response'
        ] || 'INTERNAL_SERVER_ERROR'

        const responseBody = { 
            //记录用户输入参数信息便于排查。
            Headers: req.headers,
            query: req.query,
            body: req.body,
            params: req.params,
            timeStamp: new Date().toISOString(),
            ip:requestIp.getClientIp(req),
            exception: exception['name'],
            error:msg
        }
        console.log('响应用户error信息',responseBody)
        this.logger.error('[name]', responseBody)
       httpAdapter.reply(resp,responseBody,httpStatus)
    }
}
