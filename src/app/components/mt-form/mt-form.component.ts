import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-form',
  templateUrl: './mt-form.component.html',
  styleUrls: ['./mt-form.component.scss']
})
export class MtFormComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.comp);
  }
  onSubmit() {
    if (this.sm.Schema.onSubmit) this.sm.Schema.onSubmit(this.sm, this.sm.Schema);
  }

}
