import { SchemaManager } from '../../app/base/schemaManager';
import { IComponent, ISchema, ComponentType, ButtonKind, Color } from '../../app/base/types';
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
    ]


}

export const schema3: ISchema =
{
    type: 'form',
    name: 'schema3',
    inheritFrom: schemabase,
    children: [
        {
            type: 'label',
            name: 'label',
            label: 'ext'
        },

    ]
}
