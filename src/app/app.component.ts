import { Component } from '@angular/core';
import {SchemaService} from './schema.service';
import { values } from 'src/api/schema1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schema: any;
  values: any;

  title = 'schemagenerator';

  constructor(private schemaService: SchemaService) {
    this.schema = schemaService.schema;
    this.values = schemaService.values;
  }

  getValues(): string {
    return JSON.stringify(this.values, null, 2);
  }

}
