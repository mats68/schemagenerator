import { Component, OnInit, Input } from '@angular/core';
import { SchemaManager } from '../../base-components/schemaManager';
import { IComponent, ButtonKind } from 'src/app/base-components/types';


@Component({
  selector: 'mt-btn',
  templateUrl: './mt-btn.component.html',
  styleUrls: ['./mt-btn.component.scss']
})
export class MtBtnComponent implements OnInit {
  @Input() sm: SchemaManager;
  @Input() comp: IComponent;
  btnClass: string = ButtonKind.standard;
  isIcon: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    const kind = this.comp.kind || 'standard';
    if (kind === ButtonKind.standard) this.btnClass = 'mat-button';
    else if (kind === ButtonKind.flat) this.btnClass = 'mat-flat-button';
    else if (kind === ButtonKind.raised) this.btnClass = 'mat-raised-button';
    else if (kind === ButtonKind.stroked) this.btnClass = 'mat-stroked-button';
    else if (kind === ButtonKind.icon) this.btnClass = 'mat-icon-button';
    else if (kind === ButtonKind.fab) this.btnClass = 'mat-fab';
    else if (kind === ButtonKind.minifab) this.btnClass = 'mat-mini-fab';
    this.isIcon = ['icon', 'fab', 'minifab'].includes(kind) && !!this.comp.icon;
  }

  onClick() {
    if (this.comp.onClick) {
      this.comp.onClick(this.sm, this.comp);
    }
  }


 }
