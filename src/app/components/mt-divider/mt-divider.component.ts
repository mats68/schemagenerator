import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base/schemaManager';
import { IComponent } from 'src/app/base/types';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';

@Component({
  selector: 'mt-divider',
  templateUrl: './mt-divider.component.html',
  styleUrls: ['./mt-divider.component.scss']
})
export class MtDividerComponent extends MtBaseComponent implements OnInit {
  
  ngOnInit(): void {
  }


}
