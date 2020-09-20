import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ISchema } from 'src/app/base-components/types';
import { SchemaManager } from '../../base-components/schemaManager';

@Component({
  selector: 'vs-form',
  templateUrl: './vs-form.component.html',
  styleUrls: ['./vs-form.component.scss']
})
export class VsFormComponent implements OnInit, OnChanges {
  @Input() schema: ISchema;
  @Input() values: any;
  schemaManger: SchemaManager;


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (!this.schemaManger) {
      this.schemaManger = new SchemaManager(this.schema, this.values);
    } else {
      if (this.schema !== this.schemaManger.Schema) this.schemaManger.InitSchema(this.schema);
      if (this.values !== this.schemaManger.Values) this.schemaManger.InitValues(this.values);

    }
  }

}
