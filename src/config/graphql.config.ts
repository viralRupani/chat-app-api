import { ApolloDriverConfig } from '@nestjs/apollo';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'node:path';

export class GraphqlConfig implements GqlOptionsFactory {
    createGqlOptions(): ApolloDriverConfig {
        return {
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            playground: false,
        };
    }
}
