import morphdom from 'morphdom'

// Indicates if the passed element is considered a text input.
//
export const isTextInput = element => {
  return (
    ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.tagName) &&
    [
      'color',
      'date',
      'datetime',
      'datetime-local',
      'email',
      'month',
      'number',
      'password',
      'range',
      'search',
      'select-one',
      'select-multiple',
      'tel',
      'text',
      'textarea',
      'time',
      'url',
      'week'
    ].includes(element.type)
  )
}

// Assigns focus to the appropriate element... preferring the explicitly passed focusSelector
//
// * activeElement - the most recent active element
// * focusSelector - a CSS selector for the element that should have focus
//
const assignFocus = (activeElement, focusSelector) => {
  let focusElement = focusSelector
    ? document.querySelector(focusSelector)
    : activeElement

  if (!focusElement) return

  focusElement.focus()
  if (isTextInput(focusElement)) {
    // shenanigans to ensure that the cursor is placed at the end of the existing value
    const value = focusElement.value
    focusElement.value = ''
    focusElement.value = value
  }
}

// Dispatches an event on the passed element
//
// * element - the element
// * name - the name of the event
// * detail - the event detail
//
const dispatch = (element, name, detail = {}) => {
  const init = { bubbles: true, cancelable: true }
  const evt = new Event(name, init)
  evt.detail = detail
  element.dispatchEvent(evt)
}

const xpathToElement = xpath => {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue
}

// Indicates whether or not we should morph an element
// SEE: https://github.com/patrick-steele-idem/morphdom#morphdomfromnode-tonode-options--node
//
const shouldMorph = permanentAttributeName => (fromEl, toEl) => {
  // Skip nodes that are equal:
  // https://github.com/patrick-steele-idem/morphdom#can-i-make-morphdom-blaze-through-the-dom-tree-even-faster-yes
  if (fromEl.isEqualNode(toEl)) return false
  if (!permanentAttributeName) return true
  return !fromEl.closest(`[${permanentAttributeName}]`)
}

// Morphdom Callbacks ........................................................................................

const DOMOperations = {
  // Cookies .................................................................................................

  setCookie: config => {
    document.cookie = config.cookie
  },

  // DOM Events ..............................................................................................

  dispatchEvent: config => {
    const { element, name, detail } = config
    dispatch(element, name, detail)
  },

  // Element Mutations .......................................................................................

  morph: detail => {
    const activeElement = document.activeElement
    const {
      element,
      html,
      childrenOnly,
      focusSelector,
      permanentAttributeName
    } = detail
    const template = document.createElement('template')
    template.innerHTML = String(html).trim()
    dispatch(element, 'cable-ready:before-morph', {
      ...detail,
      content: template.content
    })
    morphdom(element, template.content, {
      childrenOnly: !!childrenOnly,
      onBeforeElUpdated: shouldMorph(permanentAttributeName)
    })
    assignFocus(activeElement, focusSelector)
    dispatch(element, 'cable-ready:after-morph', {
      ...detail,
      content: template.content
    })
  },

  innerHtml: detail => {
    const activeElement = document.activeElement
    const { element, html, focusSelector } = detail
    dispatch(element, 'cable-ready:before-inner-html', detail)
    element.innerHTML = html
    assignFocus(activeElement, focusSelector)
    dispatch(element, 'cable-ready:after-inner-html', detail)
  },

  outerHtml: detail => {
    const activeElement = document.activeElement
    const { element, html, focusSelector } = detail
    dispatch(element, 'cable-ready:before-outer-html', detail)
    element.outerHTML = html
    assignFocus(activeElement, focusSelector)
    dispatch(element, 'cable-ready:after-outer-html', detail)
  },

  textContent: detail => {
    const { element, text } = detail
    dispatch(element, 'cable-ready:before-text-content', detail)
    element.textContent = text
    dispatch(element, 'cable-ready:after-text-content', detail)
  },

  insertAdjacentHtml: detail => {
    const activeElement = document.activeElement
    const { element, html, position, focusSelector } = detail
    dispatch(element, 'cable-ready:before-insert-adjacent-html', detail)
    element.insertAdjacentHTML(position || 'beforeend', html)
    assignFocus(activeElement, focusSelector)
    dispatch(element, 'cable-ready:after-insert-adjacent-html', detail)
  },

  insertAdjacentText: detail => {
    const { element, text, position } = detail
    dispatch(element, 'cable-ready:before-insert-adjacent-text', detail)
    element.insertAdjacentText(position || 'beforeend', text)
    dispatch(element, 'cable-ready:after-insert-adjacent-text', detail)
  },

  remove: detail => {
    const activeElement = document.activeElement
    const { element, focusSelector } = detail
    dispatch(element, 'cable-ready:before-remove', detail)
    element.remove()
    assignFocus(activeElement, focusSelector)
    dispatch(element, 'cable-ready:after-remove', detail)
  },

  setValue: detail => {
    const { element, value } = detail
    dispatch(element, 'cable-ready:before-set-value', detail)
    element.value = value
    dispatch(element, 'cable-ready:after-set-value', detail)
  },

  // Attribute Mutations .....................................................................................

  setAttribute: detail => {
    const { element, name, value } = detail
    dispatch(element, 'cable-ready:before-set-attribute', detail)
    element.setAttribute(name, value)
    dispatch(element, 'cable-ready:after-set-attribute', detail)
  },

  removeAttribute: detail => {
    const { element, name } = detail
    dispatch(element, 'cable-ready:before-remove-attribute', detail)
    element.removeAttribute(name)
    dispatch(element, 'cable-ready:after-remove-attribute', detail)
  },

  // CSS Class Mutations .....................................................................................

  addCssClass: detail => {
    const { element, name } = detail
    dispatch(element, 'cable-ready:before-add-css-class', detail)
    element.classList.add(name)
    dispatch(element, 'cable-ready:after-add-css-class', detail)
  },

  removeCssClass: detail => {
    const { element, name } = detail
    dispatch(element, 'cable-ready:before-remove-css-class', detail)
    element.classList.remove(name)
    dispatch(element, 'cable-ready:after-remove-css-class', detail)
  },

  // Style Mutations .......................................................................................

  setStyle: detail => {
    const { element, name, value } = detail
    dispatch(element, 'cable-ready:before-set-style', detail)
    element.style[name] = value
    dispatch(element, 'cable-ready:after-set-style', detail)
  },

  // Dataset Mutations .......................................................................................

  setDatasetProperty: detail => {
    const { element, name, value } = detail
    dispatch(element, 'cable-ready:before-set-dataset-property', detail)
    element.dataset[name] = value
    dispatch(element, 'cable-ready:after-set-dataset-property', detail)
  }
}

const perform = (
  operations,
  options = { emitMissingElementWarnings: true }
) => {
  for (let name in operations) {
    if (operations.hasOwnProperty(name)) {
      const entries = operations[name]
      for (let i = 0; i < entries.length; i++) {
        try {
          const detail = entries[i]
          if (detail.selector) {
            detail.element = detail.xpath
              ? xpathToElement(detail.selector)
              : document.querySelector(detail.selector)
          } else {
            detail.element = document
          }
          if (detail.element || options.emitMissingElementWarnings)
            DOMOperations[name](detail)
        } catch (e) {
          if (entries[i].element)
            console.log(`CableReady detected an error in ${name}! ${e.message}`)
          else
            console.log(`CableReady ${name} failed due to missing DOM element.`)
        }
      }
    }
  }
}

export default { perform }
