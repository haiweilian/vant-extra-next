import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { Descriptions } from '../index'

describe('Descriptions', () => {
  test('render', async () => {
    const wrapper = mount(Descriptions)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
