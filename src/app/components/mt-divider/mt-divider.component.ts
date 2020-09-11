import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-divider',
  templateUrl: './mt-divider.component.html',
  styleUrls: ['./mt-divider.component.scss']
})
export class MtDividerComponent implements OnInit {
  @Input() comp: any;

  constructor() { }

  ngOnInit(): void {
  }

  getStyle(): string {
    const top = this.comp.top ?? '10px';
    const bottom = this.comp.bottom ?? '10px';
    return `margin-top: ${top}; margin-bottom: ${bottom};`;
  }

}
