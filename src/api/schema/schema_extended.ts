import { SchemaManager } from '../../app/base/schemaManager';
import { IComponent, ISchema, ISchemaPartial, ComponentType, ButtonKind, Color } from '../../app/base/types';
import {buttons } from '../schemaButtons'

const schemabase: ISchema = {
    type: 'form',
    children: [
        {
            type: 'label',
            name: 'label',
            label: 'base'
        },
        {
            type: 'label',
            name: 'label2',
            label: 'base2'
        },
        {
            type: 'expansionspanel',
            label: 'buttons',
            name: 'buttonsexp',
            children: [
                {
                    type: 'button',
                    name: 'btn1',
                    label: 'click',
                }
            ]
        },
        {
            type: 'expansionspanel',
            label: 'inputs',
            name: 'inputs',
            children: [
                {
                    type: 'input',
                    field: 'input1',
                    label: 'Input1',
                },
                {
                    type: 'input',
                    field: 'input2',
                    label: 'Input2',
                },
            ]
        },
    ]


}

export const schema3: ISchemaPartial =
{
    type: 'form',
    name: 'schema3',
    inheritFrom: schemabase,
    children: [
        {
            name: 'label',
            label: 'EXT'
        },
        {
            label: 'buttons EXT',
            name: 'buttonsexp',
            children: [
                {
                    type: 'button',
                    name: 'btn2',
                    label: '2. Button',
                }
            ]
        },
        {
            name: 'inputs',
            label: 'UPDATED LABEL',
            children: [
                {
                    field: 'input1',
                    label: 'Input1 NEW LABEL',
                },
                {
                    type: 'input',
                    field: 'input3',
                    label: 'Input3 ADDED',
                },
                {
                    type: 'expansionspanel',
                    label: 'added Panel',
                    children: [
                        {
                            type: 'link',
                            kind: 'stroked',
                            href: 'https://www.sbb.ch'
                        }
                    ]
                },
            ]
        },

    ]
}
