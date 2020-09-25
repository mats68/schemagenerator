import { SchemaManager } from '../app/base/schemaManager';
import { IComponent, ISchema, ComponentType, ButtonKind, Color } from '../app/base/types';
import {buttons } from './schemaButtons'

export const schema2: ISchema =
{
    type: 'form',
    name: 'form2',
    children: [
        {
            type: 'tabs',
            tabs: [
                {
                    label: 'Inputs',
                    type: 'tab',
                    children: [
                        {
                            type: 'input',
                            name: 'firstInput',
                            label: 'Text1',
                            field: 'text1',
                            required: true,
                        },
                        {
                            type: 'input',
                            name: 'secondInput',
                            label: 'Text2',
                            field: 'text2',
                            required: true,
                        },
                    ]
                },
                {
                    label: 'Check & Radio',
                    type: 'tab',
                    children: [
                        {
                            type: 'checkbox',
                            label: 'check1',
                            required: true,
                            field: 'check1',
                        },
                        {
                            type: 'radiogroup',
                            label: 'Radiogroup',
                            cols: 'sm-12',
                            dataType: 'int',
                            options: [{value: 1, text: 'Eins'}, {value: 2, text: 'Zwei'}, {value: 3, text: 'Drei'}, {value: 4, text: 'Vier'}],
                            required: true,
                            field: 'radio1',
                        }
                    ]
                },
                {
                    label: 'Test',
                    type: 'tab',
                    children: [
                        {
                            type: 'input',
                            label: 'Test',
                            field: 'Test',
                            required: true,
                        },
                        {
                            type: 'input',
                            label: 'Test2',
                            field: 'Test2',
                            required: true,
                        },
                    ]
                },
                {
                    label: 'Selects',
                    type: 'tab',
                    children: [
                        {
                            type: 'select',
                            label: 'Numerischer Wert',
                            field: 'select1',
                            dataType: 'int',
                            required: true,
                            options: [{value: 1, text: 'Eins'}, {value: 2, text: 'Zwei'}, {value: 3, text: 'Drei'}, {value: 4, text: 'Vier'}]
                        },
                        {
                            type: 'select',
                            label: 'Text',
                            field: 'select2',
                            required: true,
                            options: ['Eins', 'Zwei', 'Drei', 'Vier']
                        }

                    ]
                }
            ]
        },
        ...buttons
    ]
}

export const values2 = {
    text1: 'Text 2'
}

