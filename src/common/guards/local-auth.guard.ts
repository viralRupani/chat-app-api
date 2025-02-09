
import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
    getRequest(context: ExecutionContext) {
        const gqlContext = GqlExecutionContext.create(context);
        const request = gqlContext.getContext();
        request.body = gqlContext.getArgs().object;
        return request;
    }
}
