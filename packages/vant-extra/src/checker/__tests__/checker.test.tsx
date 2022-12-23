import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { Checker } from '../index'

describe('Checker', () => {
  test('render', async () => {
    const wrapper = mount(Checker)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
