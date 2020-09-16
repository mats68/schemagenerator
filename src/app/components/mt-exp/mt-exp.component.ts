import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';
import { IComponent } from 'src/app/base-components/types';

@Component({
  selector: 'mt-exp',
  templateUrl: './mt-exp.component.html',
  styleUrls: ['./mt-exp.component.scss']
})
export class MtExpComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  constructor() { }

  ngOnInit(): void {
  }



}
