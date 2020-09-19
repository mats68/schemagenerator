import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';
import { IComponent } from 'src/app/base-components/types';

@Component({
  selector: 'mt-container',
  templateUrl: './mt-container.component.html',
  styleUrls: ['./mt-container.component.scss']
})
export class MtContainerComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  usesGrid: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.usesGrid = this.sm.usesGrid(this.comp);
  }


}
