import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';

@Component({
  selector: 'mt-exp',
  templateUrl: './mt-exp.component.html',
  styleUrls: ['./mt-exp.component.scss']
})
export class MtExpComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: any;

  constructor() { }

  ngOnInit(): void {
  }



}
