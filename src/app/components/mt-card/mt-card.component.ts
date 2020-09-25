import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-card',
  templateUrl: './mt-card.component.html',
  styleUrls: ['./mt-card.component.scss']
})
export class MtCardComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
