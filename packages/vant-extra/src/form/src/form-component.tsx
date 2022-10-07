import type { Component } from 'vue'
import type { FormComponentType } from './types'
import { Divider, Field, Rate, Slider, Stepper, Switch, Uploader } from 'vant'
import Area from './field-area'
import Calendar from './field-calendar'
import Cascader from './field-cascader'
import Checkbox from './field-checkbox'
import DatePicker from './field-date-picker'
import Picker from './field-picker'
import Radio from './field-radio'
import TimePicker from './field-time-picker'

export const formComponentMap = new Map<FormComponentType, Component>()

formComponentMap.set('Area', Area)
formComponentMap.set('Calendar', Calendar)
formComponentMap.set('Cascader', Cascader)
formComponentMap.set('Checkbox', Checkbox)
formComponentMap.set('DatePicker', DatePicker)
formComponentMap.set('Divider', Divider)
formComponentMap.set('Field', Field)
formComponentMap.set('Picker', Picker)
formComponentMap.set('Radio', Radio)
formComponentMap.set('Rate', Rate)
formComponentMap.set('Slider', Slider)
formComponentMap.set('Stepper', Stepper)
formComponentMap.set('Switch', Switch)
formComponentMap.set('TimePicker', TimePicker)
formComponentMap.set('Uploader', Uploader)
