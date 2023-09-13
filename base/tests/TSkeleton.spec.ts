// tests/HelloWorld.spec.ts
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import TSkeleton from "../components/TSkeleton.vue";

describe('test t-skeleton', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(TSkeleton)
    expect(wrapper.vm).toBeTruthy()
  })
})
