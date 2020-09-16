import { Component } from '@angular/core';
import { SchemaManager } from './base-components/schemaManager';
import { schema, values} from '../api/schema1'
import { schema2} from '../api/schema2'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  schemaManger: SchemaManager;
  schemaManger2: SchemaManager;
  private _sprache: string = 'de';
  get sprache(): string {
    return this._sprache;
  }
  set sprache(val: string) {
    this.schemaManger.InitLanguage(val);
    this._sprache = val;
  }
  

  title = 'schemagenerator';

  constructor() {
    this.schemaManger = new SchemaManager(schema, values);
    this.schemaManger2 = new SchemaManager(schema2);
  }

  getValues(): string {
    return JSON.stringify(this.schemaManger.Values, null, 2);
  }

  getValues2(): string {
    return JSON.stringify(this.schemaManger2.Values, null, 2);
  }


}
