import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { Link } from '../index'

describe('Link', () => {
  test('render', async () => {
    const wrapper = mount(Link)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
