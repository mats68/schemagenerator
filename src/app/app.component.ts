import { Component, ViewChild, OnInit } from '@angular/core';
import { SchemaManager, ISettings } from './base/schemaManager';
import { schema1, values1, values2 } from '../api/schema/schema1';
import { schema2 } from '../api/schema/schema2';
declare var schemas: any;
import { VsFormComponent } from './base/vs-form/vs-form.component';
import {RestService} from '../api/rest.service';
import { IAppearance, ISchema } from './base/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  curschema: any;
  curvalues: any;
  Schema1: ISchema;
  Values1: any;
  Values2: any;
  extschemas: string[];
  _schemaManger: SchemaManager;
  service: RestService;
  diffView: boolean; 
  
  Settings: ISettings = {
    language: 'de',
    requiredSuffix: ' *',
  }


  constructor(restService: RestService) {
    this.service = restService;
    this.Schema1 = schema1;
    this.Values1 = values1;
    this.Values2 = values2;
  
  }  
  get schemaManger(): SchemaManager {
    if (!this._schemaManger && this.vsform) {
      this._schemaManger = this.vsform.schemaManger;
    }
    if (this._schemaManger) return this._schemaManger;
  }
  @ViewChild(VsFormComponent) vsform: VsFormComponent;

  ngOnInit() {
    this.extschemas = [];
    Object.keys(schemas).forEach(s => this.extschemas.push(s));
    this.curschema = schema1;
    
    this.curschema.auswahllisten = {};
    this.service.getAuswahlliste('vnb').subscribe((data: any) => {
      this.curschema.auswahllisten.vnb = data.Daten;
      //console.log(data);
    });    

    this.service.getAuswahlliste('mitarbeiter').subscribe((data: any) => {
      this.curschema.auswahllisten.mitarbeiter = data.Daten;
      this.schemaManger.DataLoaded();
      

      //console.log(data);
    });    

  }

  private _sprache: string = 'de';
  get sprache(): string {
    return this._sprache;
  }
  set sprache(val: string) {
    this.schemaManger.Language = val;
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

  private _extschema: string;
  get extschema(): string {
    return this._extschema;
  }
  set extschema(val: string) {
    this._extschema = val;
    this.updateExtSchema();
  }

  private _optvalues: string = '1';
  get optvalues(): string {
    return this._optvalues;
  }
  set optvalues(val: string) {
    this._optvalues = val;
    this.updateSchema();
  }

  private _appearance: IAppearance = 'standard';
  get appearance(): IAppearance {
    return this._appearance;
  }
  set appearance(val: IAppearance) {
    this._appearance = val;
    this.Settings.appearance = val;
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
    this.schemaManger.InitSchema(this.curschema);
    this.schemaManger.InitValues(this.curvalues);
    this.schemaManger.refresh_UI();
  }

  updateExtSchema() {
    this.curschema = schemas[this.extschema];
    this.schemaManger.InitSchema(this.curschema);
  }


  title = 'Schemagenerator';

  getValues(): string {
    return JSON.stringify(this.schemaManger?.Values ?? '', null, 2);
  }


}
