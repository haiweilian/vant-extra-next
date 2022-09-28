import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { Image } from '../index'

describe('Image', () => {
  test('render', async () => {
    const wrapper = mount(Image)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
