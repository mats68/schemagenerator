import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ISchema } from 'src/app/base/types';
import { SchemaManager, ISettings } from '../../base/schemaManager';

@Component({
  selector: 'vs-form',
  templateUrl: './vs-form.component.html',
  styleUrls: ['./vs-form.component.scss'],
  host: {
    '(window:resize)': 'onResize($event)'
  }})
export class VsFormComponent implements OnInit, OnChanges {
  @Input() schema: ISchema;
  @Input() values: any;
  @Input() settings: ISettings;
  schemaManger: SchemaManager;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (!this.schemaManger) {
      this.schemaManger = new SchemaManager(null, this.settings);
    }
    if (this.schema !== this.schemaManger.Schema) {
      this.schemaManger.InitSchema(this.schema);
    } else if (this.values !== this.schemaManger.Values) {
      this.schemaManger.InitValues(this.values);
    }
 
  }

  onResize(event){
    this.schemaManger.InitScreenSize();
  }


}
