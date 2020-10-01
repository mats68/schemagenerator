# Schemagenerator

ng new schemagenerator  
ng add @angular/material

## Features
- uses angular-material
- Components: input, checkbox,  button, link, select, radio, label,html,tabs, chips,       errorpanel, icon, slider
(multilselect), date
  - Autocomplete: input with option, filter
  - nur input; kein autocomplete
  - autocomplete nur string[] options
  - Select options with strings or objects like {value: 1, text: 'one'}...
  - common properties: label, field, width, style, default
  - types defined for component
  - multiselect 
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
- switch language (settings)
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
- inherit from Base-Schema
- settings objekt 
- übersetzung (label, titel, hint, placeholder als funktion)
- min max length bei input
- . in field => sub object z.B. verwaltung.name

### todo:
- table-view
  - getcellheader und getCellValue as function on schema (can give back component)
- lesen (getValue) & speichern (updateValue, onChange)  eines anderen wertes
- highlight diff in tables und arrays
- removeAllErrors per comp (nach delete row)
- input prefix und suffix (icon, button oder text)
- tests für checkschema funktion
- style for all tags
- readonly 
- unbound Fields (not in Values)
- show loader
- filter propertys by value
- hover-effekt bei table