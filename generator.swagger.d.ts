import { GeneratorInterface } from '../kodegen-interface/generatorInterface';
export declare class SwaggerGenerator implements GeneratorInterface {
    preCompileTemplates(): void;
    go(domainModel: any): string;
}
