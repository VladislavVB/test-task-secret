import type { Directive, DirectiveBinding } from 'vue'

export const vAutoFocus: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const value = binding.value

    if (value === false) return

    const delay = typeof value === 'number' ? value : 0

    setTimeout(() => {
      focusVuetifyField(el)
    }, delay)
  },
}

function focusVuetifyField(el: HTMLElement) {
  const input =
    el.querySelector<HTMLInputElement>('input') ||
    el.querySelector<HTMLInputElement>('textarea') ||
    el.querySelector<HTMLElement>('[tabindex]')

  if (input) {
    input.focus()
  } else {
    if (el.focus && typeof el.focus === 'function') {
      el.focus()
    }
  }
}
