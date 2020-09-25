import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-lbl',
  templateUrl: './mt-lbl.component.html',
  styleUrls: ['./mt-lbl.component.scss']
})
export class MtLblComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
