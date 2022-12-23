import type { Component } from 'vue'
import type { FormComponentType } from './types'
import {
  Divider,
  Field,
  Checkbox,
  Rate,
  Slider,
  Stepper,
  Switch,
  Uploader,
} from 'vant'
import Picker from './field-picker'
import PickerSingle from './field-picker-single'
import Checker from './field-checker'
import CheckerSingle from './field-checker-single'
import RadioGroup from './field-radio-group'
import CheckboxGroup from './field-checkbox-group'
import Calendar from './field-calendar'
import DatePicker from './field-date-picker'
import TimePicker from './field-time-picker'
import DateTimePicker from './field-date-time-picker'

export const formExtendsComponent = [
  'Picker',
  'PickerSingle',
  'Checker',
  'CheckerSingle',
  'RadioGroup',
  'CheckboxGroup',
  'Calendar',
  'DatePicker',
  'TimePicker',
  'DateTimePicker',
]

export const formComponentMap = new Map<FormComponentType, Component>()

formComponentMap.set('Divider', Divider)
formComponentMap.set('Field', Field)
formComponentMap.set('Checkbox', Checkbox)
formComponentMap.set('Rate', Rate)
formComponentMap.set('Slider', Slider)
formComponentMap.set('Stepper', Stepper)
formComponentMap.set('Switch', Switch)
formComponentMap.set('Uploader', Uploader)

formComponentMap.set('Picker', Picker)
formComponentMap.set('PickerSingle', PickerSingle)
formComponentMap.set('Checker', Checker)
formComponentMap.set('CheckerSingle', CheckerSingle)
formComponentMap.set('RadioGroup', RadioGroup)
formComponentMap.set('CheckboxGroup', CheckboxGroup)
formComponentMap.set('Calendar', Calendar)
formComponentMap.set('DatePicker', DatePicker)
formComponentMap.set('TimePicker', TimePicker)
formComponentMap.set('DateTimePicker', DateTimePicker)

export function add(name: FormComponentType, component: Component) {
  formComponentMap.set(name, component)
}

export function del(name: FormComponentType) {
  formComponentMap.delete(name)
}
