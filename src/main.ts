import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
        },
    });

    app.useGlobalPipes(new ValidationPipe());
    app.use(helmet());

    const configService = app.get(ConfigService);
    await app.listen(configService.get('app.port') ?? 3000);
}
bootstrap();
