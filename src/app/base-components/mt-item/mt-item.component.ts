import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';


@Component({
  selector: 'mt-item',
  templateUrl: './mt-item.component.html',
  styleUrls: ['./mt-item.component.scss']
})
export class MtItemComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: any;

  constructor() { }

  ngOnInit(): void {
  }

  isComp(type: string): boolean {
    return !this.comp.hidden && this.comp.type == type;
  }

}
