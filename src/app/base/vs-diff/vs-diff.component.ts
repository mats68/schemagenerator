import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { values2 } from 'src/api/schema1';
import { ISchema } from 'src/app/base/types';
import { SchemaManager, ISettings } from '../../base/schemaManager';

@Component({
  selector: 'vs-diff',
  templateUrl: './vs-diff.component.html',
  styleUrls: ['./vs-diff.component.scss']
})
export class VsDiffComponent implements OnInit {
  @Input() schema: ISchema;
  @Input() values1: any;
  @Input() values2: any;
  @Input() settings: ISettings;
  schemaManger1: SchemaManager;
  schemaManger2: SchemaManager;

  constructor() { }

  ngOnInit(): void {
    this.schemaManger1 = new SchemaManager(null, this.settings);
    this.schemaManger2 = new SchemaManager(null, this.settings);
    this.schemaManger1.InitSchema(this.schema);
    this.schemaManger2.InitSchema(this.schema);
    this.schemaManger1.InitValues(this.values1, -1, this.values2);
    this.schemaManger2.InitValues(this.values2, -1, this.values1);
  }



}
