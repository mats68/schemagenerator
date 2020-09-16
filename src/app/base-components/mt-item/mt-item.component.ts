import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';
import { IComponent } from '../types';


@Component({
  selector: 'mt-item',
  templateUrl: './mt-item.component.html',
  styleUrls: ['./mt-item.component.scss']
})
export class MtItemComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  constructor() { }

  ngOnInit(): void {
  }

  isComp(type: string): boolean {
    return !this.comp.hidden && this.comp.type == type;
  }

}
