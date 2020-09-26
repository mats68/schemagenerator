import { Component, OnInit } from '@angular/core';
import { ButtonKind } from 'src/app/base/types';
import { MtBaseComponent } from 'src/app/base/mt-base/mt-base.component';

@Component({
  selector: 'mt-link',
  templateUrl: './mt-link.component.html',
  styleUrls: ['./mt-link.component.scss']
})
export class MtLinkComponent extends MtBaseComponent implements OnInit {
  kind: keyof typeof ButtonKind = ButtonKind.standard;

  ngOnInit(): void {
    this.kind = this.comp.kind || 'standard';
  }

  k(kind: string): boolean {
    return this.kind === kind;
  }

  href(): string {
    return this.sm.getPropValue(this.comp, 'href');
  } 

  target(): string {
    return this.comp.openInNewTab ? '_blank' : '';
  }

}
