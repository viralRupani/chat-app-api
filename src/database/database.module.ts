import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./data-source";

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig)]
})
export class DatabaseModule {}