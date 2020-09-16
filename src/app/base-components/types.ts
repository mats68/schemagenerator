import { SchemaManager } from './schemaManager';

export interface IComponentParams {
    sm: SchemaManager,
    comp: IComponent,
}

export type IComponentStringFunction = (IComponentParams) => string;
export type IComponentBoolFunction = (IComponentParams) => boolean;
export type IComponentFunction = (IComponentParams) => any;
export type ISelectOptionItemsFunction = (IComponentParams) => ISelectOptionItems | string[];

export interface ISelectOptionItem {
    value: string | number,
    text: string,
  }
  
export interface ISelectOptionItems extends Array<ISelectOptionItem> { }


export interface IComponent {
    type: keyof typeof ComponentType;
    label?: string | IComponentStringFunction,
    name?: string;
    field?: string,
    width?: string,
    style?: string | IComponentStringFunction,
    hidden?: boolean,
    tooltip?: string | IComponentStringFunction,
    hint?: string | IComponentStringFunction,
    children?: Array<IComponent>,
    rows?: number,
    multiline?: boolean,
    required?: boolean,
    autoupdate?: boolean,
    disabled?: boolean | IComponentBoolFunction,
    options?: ISelectOptionItems | ISelectOptionItemsFunction | string[],

    [key: string]: any,
}

export enum ComponentType {
    // containers
    card = 'card',
    panel = 'panel',
    expansionspanel = 'expansionspanel',
    tabs = 'tabs',
    tab = 'tab',
    form = 'form',
    cardgrid = 'cardgrid',
    //fields
    input = 'input',
    select = 'select',
    autocomplete = 'autocomplete',
    date = 'date',
    radiogroup = 'radiogroup',
    slider = 'slider',
    checkbox = 'checkbox',
    switch = 'switch',
    // static
    text = 'text',
    button = 'button',
    divider = 'divider',
  }
  