import type { Component } from 'vue'
import type { FormComponentType } from './types'
import { Divider, Field, Rate, Slider, Stepper, Switch, Uploader } from 'vant'
import Calendar from './field-calendar'
import Checkbox from './field-checkbox'
import DatePicker from './field-date-picker'
import DateTimePicker from './field-date-time-picker'
import Picker from './field-picker'
import Radio from './field-radio'
import Select from './field-select'
import TimePicker from './field-time-picker'

export const formComponentMap = new Map<FormComponentType, Component>()

formComponentMap.set('Calendar', Calendar)
formComponentMap.set('Checkbox', Checkbox)
formComponentMap.set('DatePicker', DatePicker)
formComponentMap.set('DateTimePicker', DateTimePicker)
formComponentMap.set('Divider', Divider)
formComponentMap.set('Field', Field)
formComponentMap.set('Picker', Picker)
formComponentMap.set('Radio', Radio)
formComponentMap.set('Rate', Rate)
formComponentMap.set('Select', Select)
formComponentMap.set('Slider', Slider)
formComponentMap.set('Stepper', Stepper)
formComponentMap.set('Switch', Switch)
formComponentMap.set('TimePicker', TimePicker)
formComponentMap.set('Uploader', Uploader)

export function add(name: FormComponentType, component: Component) {
  formComponentMap.set(name, component)
}

export function del(name: FormComponentType) {
  formComponentMap.delete(name)
}
