import { GqlModuleOptions, GqlOptionsFactory } from "@nestjs/graphql";
import { join } from "node:path";

export class GraphqlConfig implements GqlOptionsFactory {
    createGqlOptions(): Omit<GqlModuleOptions<any>, "driver"> | Promise<Omit<GqlModuleOptions<any>, "driver">> {
        return {
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
        }
    }
}