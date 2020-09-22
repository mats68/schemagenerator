import { strings } from './strings';
import { ISchema, IComponent, ISelectOptionItems, DataType, IScreenSize } from './types';

export interface ISettings {
  requiredSuffix: string;
  requiredErrorMsg: string;
}

export class SchemaManager {
  Schema: ISchema;
  Values: any;
  ValuesChanged: boolean;
  // private origValues: any;
  CompsByName: any;
  CompsByField: any;
  
  private _ScreenSize: IScreenSize;
  get ScreenSize(): IScreenSize {
    return this._ScreenSize;
  }

  set ScreenSize(val: IScreenSize) {
    if (this._ScreenSize !== val) {
      this._ScreenSize = val;
      if (this.Schema.onResize) {
        this.Schema.onResize(this)
      }
    }
  }

  private _NeedsRefreshUI: boolean = false;
  get NeedsRefreshUI(): boolean {
    return this._NeedsRefreshUI;
  }
  refresh_UI() {
    setTimeout(() => this._NeedsRefreshUI = true);
    setTimeout(() => this._NeedsRefreshUI = false);
  }

  Language: string;
  Strings: any;


  Settings: ISettings = {
    requiredSuffix: ' *',
    requiredErrorMsg: 'Eingabe erforderlich',
  }

  constructor(schema: ISchema, values: any = null) {
    this.InitSchema(schema);
    this.InitValues(values);
    this.InitLanguage(schema.language);
    this.InitScreenSize();
  }

  InitSchema(schema: ISchema) {
    this.Schema = schema;
    const fillComps = (arr: any[]) => {
      arr.forEach((item: any) => {
        if (item.name) { this.CompsByName[item.name] = item; }
        if (item.field) { this.CompsByField[item.field] = item; }
        if (item.children) { fillComps(item.children); }
      });
    };

    this.CompsByName = {};
    this.CompsByField = {};
    if (this.Schema.name) { this.CompsByName[this.Schema.name] = this.Schema; }
    fillComps(this.Schema.children);
    if (this.Schema.onInitSchema) this.Schema.onInitSchema(this);

  }

  InitValues(values: any) {
    if (values) {
      this.Values = values;
    } else {
      this.Values = {};
      Object.keys(this.CompsByField).forEach(comp => {
        if (this.CompsByField[comp].default) {
          const val = this.getPropValue(this.CompsByField[comp], 'default');
          this.Values[comp] = val;
        }
      });
    }
    this.ValuesChanged = false;
    if (this.Schema.onInitValues) this.Schema.onInitValues(this);
    // this.origValues = JSON.parse(JSON.stringify(this.Values));

  }

  InitLanguage(language: string) {
    if (!language) {
      language = 'de';
    }
    this.Schema.language = language;
    this.Strings = strings[this.Schema.language];
  }

  InitScreenSize() {
    if (screen.width >= 1200) {
      this.ScreenSize = 'lg';
    } else if (screen.width >= 992) { 
      this.ScreenSize = 'md';
    } else if (screen.width >= 768) { 
      this.ScreenSize = 'sm';
    } else { 
      this.ScreenSize = 'xs';
    }
  }

  DataLoaded() {
    if (this.Schema.onDataLoaded) this.Schema.onDataLoaded(this);
  }

  getPropValue(comp: IComponent, prop: string): any {
    if (typeof comp[prop] === 'undefined') {
      return undefined;
    } else if (typeof comp[prop] === 'function') {
      return comp[prop](this, comp);
    } else {
      return comp[prop];
    }
  }

  getLabel(comp: IComponent): string {
    return this.getPropValue(comp, 'label') + (comp.required ? this.Settings.requiredSuffix : '');
  }

  getValue(comp: IComponent): any {
    let val;
    if (!comp.field) {
      console.error('field not specified !');
      console.dir(JSON.stringify(comp));
      return undefined;
    }

    val = this.Values[comp.field];

    if (!val) {
      if (comp.type === 'checkbox') {
        return false;
      }
      if (comp.type === 'datatable') {
        return [];
      }
      return '';
    }
    return val;
  }

  updateValue(comp: IComponent, val: any): void {

    if (comp.dataType === DataType.float) {
      val = parseFloat(val);
      if (isNaN(val)) val = null;

    }
    if (comp.dataType === DataType.int) {
      val = parseInt(val);
      if (isNaN(val)) val = null;
    }

    if (this.Values[comp.field] === val) return;
    this.Values[comp.field] = val;
    this.validate(comp);

    if (comp.onChange) {
      comp.onChange(this, comp, val);
    }

    this.ValuesChanged = true;
  }

  validate(comp: IComponent): void {
    comp.error = '';
    const val = this.Values[comp.field];

    if (!val && comp.required) {
      comp.error = `${this.Settings.requiredErrorMsg}`;
      return;
    }

    if (comp.validate) {
      comp.error = comp.validate(this, comp, val);
    }
  }

  validateAll() {
    Object.keys(this.CompsByField).forEach(comp => {
      this.validate(this.CompsByField[comp]);
    });
  }

  getStyle(comp: IComponent): string {
    const width = comp.width ? `width: ${comp.width};` : '';
    const style = comp.style ?? '';
    return `${width}${style}`;
  }


  toggleVisible(name: string, visible: boolean) {
    const c = name ? this.CompsByName[name] : null;
    if (c) {
      c.hidden = !visible;
    }
  }

  selectOptionsAsObjects(comp: IComponent): ISelectOptionItems {
    const val = this.getPropValue(comp, 'options');
    if (!val || !Array.isArray(val) || val.length === 0) return [];
    let ret: ISelectOptionItems = [];
    if (typeof val[0] === "string") {
      val.forEach(item => ret.push({ value: item, text: item }));
      return ret;
    } else {
      return val;
    }
  }

  selectOptionsAsStrings(comp: IComponent): string[] {
    const val = this.getPropValue(comp, 'options');
    if (!val || !Array.isArray(val) || val.length === 0) return [];
    let ret: string[] = [];
    if (typeof val[0] === "object") {
      val.forEach(item => ret.push(item.text));
      return ret;
    } else {
      return val;
    }
  }

  getColsClass(comp: IComponent, prop: string = 'cols'): string {
    let ret = this.getPropValue(comp, prop) || '';
    if (ret.indexOf('col-xs') === -1) {
      ret = 'col-xs-12 ' + ret;
    }
    return ret;
  }

  usesGrid(comp: IComponent): boolean {
    if (!comp.children) return false;
    const hasGrid = comp.children.find(f => f.cols);
    return !!hasGrid;
  }



}
