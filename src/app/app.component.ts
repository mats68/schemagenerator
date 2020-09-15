import { Component } from '@angular/core';
import { SchemaManager } from './base-components/schemaManager';
import { schema, values} from '../api/schema1'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  schemaManger: SchemaManager;
  

  title = 'schemagenerator';

  constructor() {
    this.schemaManger = new SchemaManager(schema, values);
  }

  getValues(): string {
    return JSON.stringify(this.schemaManger.Values, null, 2);
  }

  getSchema(): string {
    return JSON.stringify(this.schemaManger.Schema, null, 2);
  }


}
