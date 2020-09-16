// import { GRIDID } from './constants';
import {strings} from './strings';

export interface ISettings {
    requiredSuffix: string;
    requiredErrorMsg: string;
}

export class SchemaManager {
    Schema: any;
    Values: any;
    ValuesChanged: boolean;
    // private origValues: any;
    CompsByName: any;
    CompsByField: any;
    Strings: any;

    Settings: ISettings = {
        requiredSuffix: ' *',
        requiredErrorMsg: 'Eingabe erforderlich',
    }

    constructor(schema: any, values: any = null, language: string = 'de') {
        this.InitSchema(schema);
        this.InitValues(values);
        this.InitLanguage(language);
    }

    InitSchema(schema: any) {
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
        // this.origValues = JSON.parse(JSON.stringify(this.Values));

    }

    InitLanguage(lang: string) {
        this.Strings = strings[lang];
    }

    getPropValue(comp: any, prop: string): any {
        if (typeof comp[prop] === 'undefined') {
            return undefined;
        } else if (typeof comp[prop] === 'function') {
            return comp[prop](this, comp);
        } else {
            return comp[prop];
        }
    }

    getLabel(comp: any): string {
        return this.getPropValue(comp, 'label') + (comp.required ? this.Settings.requiredSuffix : '');
    }

    getValue(comp: any): any {
        let val;
        if (!comp.field) {
            console.error('field not specified !');
            console.dir(JSON.stringify(comp));
            return undefined;
        }

        // if (!comp.parent) {
        val = this.Values[comp.field];
        // } else {
        //     const arr = this.Values[comp.parent.field];
        //     const cur = arr.find(item => item[GRIDID] === comp.parent.CurEditId);
        //     if (cur) {
        //         val = cur[comp.field];
        //     }
        // }

        if (!val) {
            if (comp.type === 'checkbox') {
                return false;
            }
            if (comp.type === 'cardgrid') {
                return [];
            }
            return '';
        }
        return val;


    }

    updateValue(comp: any, val: any): void {

        // if (!comp.parent) {
            if (this.Values[comp.field] === val) return;
            this.Values[comp.field] = val;
        // } else {
        //     //grid
        //     const arr = this.Values[comp.parent.field];
        //     const cur = arr.find(item => item[GRIDID] === comp.parent.CurEditId);
        //     if (cur) {
        //         if (cur[comp.field] === val) return;
        //         cur[comp.field] = val;
        //     }
        // }
        this.validate(comp);

        if (comp.onChange) {
            comp.onChange(this, val, comp);
        }

        this.ValuesChanged = true;
    }

    validate(comp: any): void {
        comp.error = '';
        const val = this.Values[comp.field];

        if (!val && comp.required) {
            comp.error = `${this.Settings.requiredErrorMsg}`;
            return;
        }

        if (comp.validate) {
            comp.error = comp.validate(this, comp);
        }
    }

    getStyle(comp: any): string {
        const width = comp.width ? `width: ${comp.width};` : 'width: 100%;';
        const style = comp.style ?? '';
        return `margin: 10px;${width}${style}`;
    }


    validateAll() {
        Object.keys(this.CompsByField).forEach(comp => {
            this.validate(this.CompsByField[comp]);
        });
    }

    toggleVisible(name: string, visible: boolean) {
        const c = name ? this.CompsByName[name] : null;
        if (c) {
            c.hidden = !visible;
        }
    }


}
