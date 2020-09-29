import { Component, ViewChild, OnInit } from '@angular/core';
import { SchemaManager, ISettings } from './base/schemaManager';
import { schema1, values1_1, values1_2 } from '../api/schema/schema1';
import { schema2 } from '../api/schema/schema2';
import { schema3 } from '../api/schema/schema_extended';
import { schema_IA, values_IA } from '../api/schema/schema_IA';

declare var schemas: any; //Schemas aus index.html eingebunden
import { VsFormComponent } from './base/vs-form/vs-form.component';
import { RestService } from '../api/rest.service';
import { IAppearance, ISchema } from './base/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  schemas_obj = {
    schema1,
    schema2,
    schema3,
    schema_IA,
  }
  schemas_arr = [];

  values_obj = {
    values1_1,
    values1_2,
    values_IA,
  }
  values_arr = [];

  curschema: any = {};
  curvalues: any = {};
  _schemaManger: SchemaManager;
  diffView: boolean;
  auswahllisten: any = {};

  Settings: ISettings = {
    language: 'de',
    requiredSuffix: ' *',
    date: {
      parse: {
        dateInput: 'DD.MM.YYYY',
      },
      display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
      },
    }
  }


  constructor(private service: RestService) {

  }

  get schemaManger(): SchemaManager {
    if (!this._schemaManger && this.vsform) {
      this._schemaManger = this.vsform.schemaManger;
    }
    if (this._schemaManger) return this._schemaManger;
  }
  @ViewChild(VsFormComponent) vsform: VsFormComponent;

  ngOnInit() {
    Object.keys(schemas).forEach(s => this.schemas_obj[s] = schemas[s]); //external schemas
    this.schemas_arr = Object.keys(this.schemas_obj);
    this.values_arr = Object.keys(this.values_obj);

    this.service.getAuswahlliste('vnb').subscribe((data: any) => {
      this.auswahllisten.vnb = data.Daten;
      this.loadAuswahllisteInSchema();
    });

    this.service.getAuswahlliste('mitarbeiter').subscribe((data: any) => {
      this.auswahllisten.mitarbeiter = data.Daten;
      this.loadAuswahllisteInSchema();
      if (!this.schema) {
        this.schema = this.schemas_arr[0];
      }
    });

  }

  private loadAuswahllisteInSchema() {
    if (this.curschema.loadAuswahllisten && this.auswahllisten) {
      this.curschema.loadAuswahllisten(this.schemaManger, this.auswahllisten);
    }

  }

  private _sprache: string = 'de';
  get sprache(): string {
    return this._sprache;
  }
  set sprache(val: string) {
    this.schemaManger.Language = val;
    this._sprache = val;
  }

  private _schema: string;
  get schema(): string {
    return this._schema;
  }
  set schema(val: string) {
    this.curschema = this.schemas_obj[val];
    this._schema = val;
    this.schemaManger.InitSchema(this.curschema);
    this.schemaManger.InitValues(this.curvalues);
    this.loadAuswahllisteInSchema();
  }

  private _values: string;
  get values(): string {
    return this._values;
  }
  set values(val: string) {
    if (val === '0') {
      this.curvalues = {}
    } else {
      this.curvalues = this.values_obj[val];
    }
    this._values = val;
    this.schemaManger.InitValues(this.curvalues);
    // this.schemaManger.refresh_UI();
  }

  private _appearance: IAppearance = 'standard';
  get appearance(): IAppearance {
    return this._appearance;
  }
  set appearance(val: IAppearance) {
    this._appearance = val;
    this.Settings.appearance = val;
  }

  // updateSchema() {
  //   if (this.schema === 'schema1') {
  //     this.curschema = schema1;
  //     if (this.optvalues === '2') {
  //       this.curvalues = values1;
  //     } else {
  //       this.curvalues = null;
  //     }
  //   } else if (this.schema === 'schema2') {
  //     this.curschema = schema2;
  //     if (this.optvalues === '2') {
  //       this.curvalues = values2;
  //     } else {
  //       this.curvalues = null;
  //     }
  //   } else if (this.schema === 'schema3') {
  //     this.curschema = schema3;
  //     this.curvalues = null;
  //   } else if (this.schema === 'schema_IA') {
  //     this.curschema = schema_IA;
  //     this.curvalues = values_IA;
  //   }
  //   this.schemaManger.InitSchema(this.curschema);
  //   this.schemaManger.InitValues(this.curvalues);
  //   this.schemaManger.refresh_UI();
  // }

  // updateExtSchema() {
  //   this.curschema = schemas[this.extschema];
  //   this.schemaManger.InitSchema(this.curschema);
  // }


  title = 'Schemagenerator';

  getValues(): string {
    return JSON.stringify(this.schemaManger?.Values ?? '', null, 2);
  }

  getSchema(): string {
    return JSON.stringify(this.schemaManger?.Schema ?? '', null, 2);
  }

}
