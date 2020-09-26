import { Component, OnInit, Input } from '@angular/core';
import { ButtonKind } from 'src/app/base/types';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';

@Component({
  selector: 'mt-btn',
  templateUrl: './mt-btn.component.html',
  styleUrls: ['./mt-btn.component.scss']
})
export class MtBtnComponent extends MtBaseComponent implements OnInit  {
  kind: keyof typeof ButtonKind = ButtonKind.standard;

  ngOnInit(): void {
    this.kind = this.comp.kind || 'standard';
  }

  k(kind: string): boolean {
    return this.kind === kind;
  }

  onClick() {
    if (this.comp.onClick) {
      this.comp.onClick(this.sm, this.comp);
    }
  }


 }
