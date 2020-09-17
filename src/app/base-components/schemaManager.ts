import { strings } from './strings';
import { IComponent, ISelectOptionItems } from './types';

export interface ISettings {
    requiredSuffix: string;
    requiredErrorMsg: string;
}

export class SchemaManager {
    Schema: IComponent;
    Values: any;
    ValuesChanged: boolean;
    // private origValues: any;
    CompsByName: any;
    CompsByField: any;

    Language: string;
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
        this.Language = lang;
        this.Strings = strings[lang];
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
            if (comp.type === 'cardgrid') {
                return [];
            }
            return '';
        }
        return val;
    }

    updateValue(comp: IComponent, val: any): void {

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

    getStyle(comp: IComponent): string {
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

    selectOptionsAsObjects(comp: IComponent): ISelectOptionItems {
        const val = this.getPropValue(comp, 'options');
        if (!val || !Array.isArray(val) || val.length === 0) return [];
        let ret: ISelectOptionItems = [];
        if (typeof val[0] === "string" ) {
            val.forEach(item => ret.push({value: item, text: item}));
            return ret;
        } else {
            return val;
        }
    }

    selectOptionsAsStrings(comp: IComponent): string[] {
        const val = this.getPropValue(comp, 'options');
        if (!val || !Array.isArray(val) || val.length === 0) return [];
        let ret: string[] = [];
        if (typeof val[0] === "object" ) {
            val.forEach(item => ret.push(item.text));
            return ret;
        } else {
            return val;
        }
    }


}
