import { SchemaManager } from './schemaManager';

export type IComponentStringFunction = (sm: SchemaManager, comp: IComponent, value?: any) => string;
export type IComponentBoolFunction = (sm: SchemaManager, comp: IComponent, value?: any) => boolean;
export type IComponentFunction = (sm: SchemaManager, comp: IComponent, value?: any) => void;
export type ISelectOptionItemsFunction = (sm: SchemaManager, comp: IComponent, value?: any) => ISelectOptionItems | string[];

export interface ISelectOptionItem {
    value: string | number,
    text: string,
  }

export interface ISelectOptionItems extends Array<ISelectOptionItem> { }


export interface IComponent {
    type: keyof typeof ComponentType;
    dataType?: keyof typeof DataType;
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
    validate?: IComponentStringFunction,
    onChange?: IComponentFunction,
    disabled?: boolean | IComponentBoolFunction,
    options?: ISelectOptionItems | ISelectOptionItemsFunction | string[],
    cols?: string | IComponentStringFunction,
    datacols?: string | IComponentStringFunction,
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

  export enum DataType {
    string = 'string',
    float = 'float',
    int = 'int',
    bool = 'bool',
    date = 'date',
  }

