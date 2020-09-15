import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';

@Component({
  selector: 'mt-form',
  templateUrl: './mt-form.component.html',
  styleUrls: ['./mt-form.component.scss']
})
export class MtFormComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: any;
  constructor() { }

  ngOnInit(): void {
    // console.log(this.comp);
  }

}
