# Schemagenerator

ng new schemagenerator  
ng add @angular/material

## Features
- uses angular-material
- Components: input, checkbox,  button, link, select, radio, label,html,
  - Autocomplete: input with option, filter
  - nur input; kein autocomplete
  - autocomplete nur string[] options
  - Select options with strings or objects like {value: 1, text: 'one'}...
  - common properties: label, field, width, style, default
  - types defined for component
  - datatype: number, float..
 - Containers: form, panel, expansionpanel
   - Card Grid
  - label,hint, placeholder etc. as function
  - default value 
- Values Object
- Validation
  - required, function
  - validate per field
  - validate all (on submit)
  - requrired fields with *         
- properties can be functions or value
- check if form has changed (enable button)
- switch language
- switch schema at runtime
- switch values at runtime
- refresh UI 
- load external js file (schema)
- text-mask
- grid system (cols-property)
- onResize in schemaManager
- datatable
- not validate bug in grid
- events in schemaManager (Observables)
- focus input
- teil-Schema einbinden (mit ...)
- tabs set selected index
- panel mit all errors, (mit Feldnamen am anfang)
- drag-drop data-table rows
- appearance form field
- getstyle: remove 100% , instead make class
- Dokumente vergleichen

### todo:
- style for all tags
- base component with inheritance
- Components: Chips, ja/nein Panel,Date, Sidenav ?, Tabs ?
- btn nok (color usw)
- styles for label u.a.
- input prefix und suffix (icon oder text)npm install --save ngx-mask
- settings objekt 
- sm.translate function ("de", "fr", "it")
- schemamanager innerhalb mt-form
- readonly 
- default properties, for inputs (eg. appearance) in schema
- validation
- Validation
- on tabs etc: statt label component
- disabled (input, check, btn...)
- unbound Fields (not in Values)
- exp.panel ev. expanded on start
- input w prefix, suffix, hint, multiline
- übersetzung (label, titel, hint, placeholder als funktion)
- tooltip
- split
- show loader
- filter propertys by value
- hover-effekt bei table
- tests ?
- checkschema function: sever errors and warnings
- inherit from Base-Schema:
  1. implements-property on schema, implemented schema should not have a implements-property
  2. implements-schema is full schema, current schema is partial schema (with only changed or added properties)
  3. cloneDeep both schemas
  4. find components with from current schema in implements-schema with same name or field: 
     - if found: 
       - if component in implements-schema has no children: merge component
       - if component in implements-schema has children: remove children first, then merge, then add children again!
     - if not found: 
       - find parent property in implements-schema
         - if found: push to parent children of implements-schema
         - if not found: push to top children of implements-schema
       