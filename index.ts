import {singleton} from 'tsyringe';
import {GeneratorInterface} from '../kodegen-interface/generatorInterface';
import * as Handlebars from 'handlebars';
import fs from 'fs';
import {join} from 'path';
import {plural} from 'pluralize';
import {camelCase, lowerCase, pascalCase, sentenceCase, titleCase} from 'change-case-all';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let createSwaggerTemplate: Handlebars.TemplateDelegate<any>;

@singleton()
export class SwaggerGenerator implements GeneratorInterface {

  preCompileTemplates(): void {
    Handlebars.registerHelper('pascalCase', (value) => {
      return pascalCase(value);
    });

    Handlebars.registerHelper('camelCase', (value) => {
      return camelCase(value);
    });

    Handlebars.registerHelper('sentenceCase', (value) => {
      return sentenceCase(value);
    });

    Handlebars.registerHelper('titleCase', (value) => {
      let newName = sentenceCase(value);
      return titleCase(newName);
    });

    Handlebars.registerHelper('lowerCase', (value) => {
      return lowerCase(value);
    });

    Handlebars.registerHelper('pluralize', (value) => {
      return plural(value);
    });

    const tags: string = fs.readFileSync(join(__dirname, 'templates', 'swagger.tags.handlebars'), 'utf8');
    Handlebars.registerPartial('tags', tags);

    const paths: string = fs.readFileSync(join(__dirname, 'templates', 'swagger.paths.handlebars'), 'utf8');
    Handlebars.registerPartial('paths', paths);

    const definitions: string = fs.readFileSync(join(__dirname, 'templates', 'swagger.definition.handlebars'), 'utf8');
    Handlebars.registerPartial('definitions', definitions);

    const source: string = fs.readFileSync(join(__dirname, 'templates', 'swagger.handlebars'), 'utf8');
    createSwaggerTemplate = Handlebars.compile(source);
  }

  go(domainModel: any): string {
    let code = createSwaggerTemplate(domainModel);
    return code;
  }
}
