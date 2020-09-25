import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';

@Component({
  selector: 'mt-panel',
  templateUrl: './mt-panel.component.html',
  styleUrls: ['./mt-panel.component.scss']
})
export class MtPanelComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;

  constructor() { }

  ngOnInit(): void {
  }

}
