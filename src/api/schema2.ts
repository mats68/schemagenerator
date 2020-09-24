import { SchemaManager } from '../app/base/schemaManager';
import { IComponent, ISchema, ComponentType, ButtonKind, Color } from '../app/base/types';

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
                            default: 'Standard'
                        },
                        {
                            type: 'input',
                            name: 'secondInput',
                            label: 'Text2',
                            field: 'text2',
                            default() {
                                return 'Test2';
                            }
                        },
                    ]
                },
                {
                    label: 'Checks',
                    type: 'tab',
                    children: [
                        {
                            type: 'checkbox',
                            label: 'check1',
                            field: 'check1',
                        }
                    ]
                }
            ]
        },
    ]
}

export const values2 = {
    text1: 'Text 2'
}

