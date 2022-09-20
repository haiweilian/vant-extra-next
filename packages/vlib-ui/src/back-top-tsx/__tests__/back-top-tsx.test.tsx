import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { BackTopTsx } from '../index'

describe('BackTopTsx.vue', () => {
  test('render', async () => {
    const wrapper = mount(
      () => (
        <div class="target" style="height: 100px; overflow: auto">
          <div style="height: 10000px; width: 100%">
            <BackTopTsx
              target=".target"
              visibilityHeight={2000}
              right={100}
              bottom={200}
            />
          </div>
        </div>
      ),
      { attachTo: document.body }
    )
    await nextTick()

    expect(wrapper.find('.vlib-back-top-tsx').exists()).toBe(false)

    wrapper.element.scrollTop = 2000
    await wrapper.trigger('scroll')
    expect(wrapper.find('.vlib-back-top-tsx').exists()).toBe(true)

    expect(wrapper.find('.vlib-back-top-tsx').attributes('style')).toBe(
      'right: 100px; bottom: 200px;'
    )

    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeDefined()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
