# Schemagenerator

ng new schemagenerator  
ng add @angular/material

## Features
- uses angular-material
- Components: input, checkbox,  button, link, select, radio, label,html,tabs
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
- inherit from Base-Schema
- settings objekt 
- übersetzung (label, titel, hint, placeholder als funktion)
- min max length bei input
- . in field => sub object z.B. verwaltung.name

### todo:
- input prefix und suffix (icon, button oder text)
- tests für checkschema funktion
- style for all tags
- Components: Chips, ja/nein Panel,Date,icon,chips 
- sm.translate function ("de", "fr", "it")
- readonly 
- Validation
- unbound Fields (not in Values)
- show loader
- filter propertys by value
- hover-effekt bei table