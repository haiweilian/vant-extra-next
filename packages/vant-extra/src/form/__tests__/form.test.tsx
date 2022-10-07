import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { Form } from '../index'

describe('Form', () => {
  test('render', async () => {
    const wrapper = mount(Form)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
