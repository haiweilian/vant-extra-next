import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { Card } from '../index'

describe('Card.vue', () => {
  test('test component props', async () => {
    const wrapper = mount(() => (
      <Card
        shadow
        title="This is title"
        desc="This is desc"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        fit="cover"
      />
    ))

    expect(wrapper.find('.vae-card').classes('vae-card--shadow')).toBe(true)

    expect(wrapper.find('.vae-card__title').text()).toBe('This is title')

    expect(wrapper.find('.vae-card__desc').text()).toBe('This is desc')
  })

  test('test component slots', async () => {
    const slots = {
      extra: () => 'This is extra',
      default: () => 'This is content',
    }
    const wrapper = mount(() => (
      <Card
        shadow
        title="This is title"
        desc="This is desc"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        fit="cover"
        v-slots={slots}
      />
    ))

    expect(wrapper.html()).toMatchSnapshot()
  })
})
