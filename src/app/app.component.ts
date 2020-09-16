import { Component } from '@angular/core';
import { SchemaManager } from './base-components/schemaManager';
import { schema1, values1 } from '../api/schema1';
import { schema2, values2 } from '../api/schema2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  curschema: any;
  curvalues: any;

  schemaManger: SchemaManager;
  private _sprache: string = 'de';
  get sprache(): string {
    return this._sprache;
  }
  set sprache(val: string) {
    this.schemaManger.InitLanguage(val);
    this._sprache = val;
  }
  private _schema: string = 'schema1';
  get schema(): string {
    return this._schema;
  }
  set schema(val: string) {
    this._schema = val;
    this.updateSchema();
  }

  private _optvalues: string = '1';
  get optvalues(): string {
    return this._optvalues;
  }
  set optvalues(val: string) {
    this._optvalues = val;
    this.updateSchema();
  }

  updateSchema() {
    if (this.schema === 'schema1') {
      this.curschema = schema1;
      if (this.optvalues === '2') {
        this.curvalues = values1;
      } else {
        this.curvalues = null;
      }
    } else {
      this.curschema = schema2;
      if (this.optvalues === '2') {
        this.curvalues = values2;
      } else {
        this.curvalues = null;
      }
    }
    const curvalues =  JSON.parse(JSON.stringify(this.curvalues));
    this.schemaManger.InitSchema(this.curschema);
    this.schemaManger.InitValues(curvalues);
  }

  title = 'schemagenerator';

  constructor() {
    this.schemaManger = new SchemaManager(schema1);
  }

  getValues(): string {
    return JSON.stringify(this.schemaManger.Values, null, 2);
  }

}
