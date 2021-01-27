# DOM Mutations

## append

Inserts HTML into the DOM, inside the target element, after its last child.

```ruby
cable_ready["MyChannel"].append(
  cancel:         true|false, # [false]  - cancel the operation (for use on client)
  focus_selector: "string",   # [null]   - string containing a CSS selector
  html:           "string",   # [null]   - the HTML to assign
  select_all:     true|false, # [false]  - operate on list of elements returned from selector
  selector:       "string",   # required - string containing a CSS selector or XPath expression
  xpath:          true|false  # [false]  - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-append`
* `cable-ready:after-append`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement)
* [https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/append)

## graft

Reparent the target element and its children to a new parent element in the DOM.

Grafted elements are moved, not recreated. This means that any Stimulus controllers attached to an element will `disconnect` and then immediately`connect` again, but **their internal state remains intact**.

```ruby
cable_ready["MyChannel"].graft(  
  cancel:         true|false, # [false]  - cancel the operation (for use on client)
  focus_selector: "string",   # [null]   - string containing a CSS selector
  parent:         "string",   # [null]   - string containing a CSS selector
  select_all:     true|false, # [false]  - operate on list of elements returned from selector
  selector:       "string",   # required - string containing a CSS selector or XPath expression
  xpath:          true|false  # [false]  - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-graft`
* `cable-ready:after-graft`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

## inner\_html

Sets the innerHTML of a DOM element.

```ruby
cable_ready["MyChannel"].inner_html(  
  cancel:         true|false, # [false]  - cancel the operation (for use on client)
  focus_selector: "string",   # [null]   - string containing a CSS selector
  html:           "string",   # [null]   - the HTML to assign
  select_all:     true|false, # [false]  - operate on list of elements returned from selector
  selector:       "string",   # required - string containing a CSS selector or XPath expression
  xpath:          true|false  # [false]  - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-inner-html`
* `cable-ready:after-inner-html`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)

## [insert\_adjacent\_html](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)

Inserts HTML into the DOM relative to an element. Positions are as follows, defaulting to `beforeend`:

* `beforebegin`: Before the target element itself
* `afterbegin`: Inside the target element, before its first child
* `beforeend`: Inside the target element, after its last child
* `afterend`: After the target element itself

```ruby
cable_ready["MyChannel"].insert_adjacent_html(
  cancel:         true|false, # [false]  - cancel the operation (for use on client)
  focus_selector: "string",   # [null]      - string containing a CSS selector
  html:           "string",   # [null]      - the HTML to insert
  position:       "string",   # [beforeend] - the relative position to the DOM element (beforebegin, afterbegin, beforeend, afterend)
  select_all:     true|false, # [false]     - operate on list of elements returned from selector
  selector:       "string",   # required    - string containing a CSS selector or XPath expression
  xpath:          true|false  # [false]     - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-insert-adjacent-html`
* `cable-ready:after-insert-adjacent-html`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML)

## insert\_adjacent\_text

Inserts text into the DOM relative to an element. Positions are as follows, defaulting to `beforeend`:

* `beforebegin`: Before the target element itself
* `afterbegin`: Inside the target element, before its first child
* `beforeend`: Inside the target element, after its last child
* `afterend`: After the target element itself

```ruby
cable_ready["MyChannel"].insert_adjacent_text(
  cancel:         true|false,     # [false]     - cancel the operation (for use on client)
  focus_selector: "string",       # [null]      - string containing a CSS selector
  position:       "string",       # [beforeend] - the relative position to the DOM element (beforebegin, afterbegin, beforeend, afterend)
  select_all:     true|false,     # [false]     - operate on list of elements returned from selector
  selector:       "string",       # required    - string containing a CSS selector or XPath expression
  text:           "string",       # [null]      - the text to insert
  xpath:          true|false      # [false]     - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-insert-adjacent-text`
* `cable-ready:after-insert-adjacent-text`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentText](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentText)

## morph

Fast lightweight DOM diffing/patching without a virtual DOM.

```ruby
cable_ready["MyChannel"].morph(
  cancel:                   true|false, # [false]  - cancel the operation (for use on client)
  children_only:            true|false, # [false]  - indicates if only child nodes should be morphed... skipping the parent element
  focus_selector:           "string",   # [null]   - string containing a CSS selector
  html:                     "string",   # [null]   - the HTML to assign  
  permanent_attribute_name: "string",   # [null]   - an attribute name that prevents elements from being updated i.e. "data-permanent"
  select_all:               true|false, # [false]  - operate on list of elements returned from selector
  selector:                 "string",   # required - string containing a CSS selector or XPath expression
  xpath:                    true|false  # [false]  - process the selector as an XPath expression
)
```

When morphing an element with `children_only: true` you need to make sure that the content you're providing to the `html` value will result in a successful operation:

* it must have a **single** top-level container element with the same CSS selector as the target
* inside that container element is another [element node](https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType), **not a text node**

Consider the following example of `#foo`, a successful morphing candidate:

{% code title="show.html.erb" %}
```markup
<div>
  <%= render partial: "foo", locals: {message: "Am I the medium or the massage?"} %>
</div>
```
{% endcode %}

{% code title="\_foo.html.erb" %}
```markup
<div id="foo">
  <span><%= message %></span>
</div>
```
{% endcode %}

If the `<div id="foo">` was located in `show.html.erb` the morph would **not** succeed because the top-level container that you're replacing would not be present in the replacement HTML.

If you need to render a collection of partials, you'll have to wrap the render method in a container because you cannot have the top-level container in each partial:

{% code title="show.html.erb" %}
```markup
<div id="bar">
  <%= render collection: @bars %>
</div>
```
{% endcode %}

{% code title="\_bar.html.erb" %}
```markup
<span><%= bar.message %></span>
```
{% endcode %}

```ruby
cable_ready["MyChannel"].morph(
  children_only: true,
  selector: "#bar",
  html: "<div id=\"bar\">" + render(Bar.all) + "</div>"
)
```

#### Life-cycle Callback Events

* `cable-ready:before-morph`
* `cable-ready:after-morph`

#### Reference

* [https://github.com/patrick-steele-idem/morphdom](https://github.com/patrick-steele-idem/morphdom)
* [shouldMorph and didMorph callbacks](../../customization.md#shouldmorph-and-didmorph)
* [Single Source of Truth](../../usage.md#single-source-of-truth)
* [Morph Sanity Checklist](../../troubleshooting/morph-checklist.md)
* [When to use a StimulusReflex morph vs. a CableReady operation](https://docs.stimulusreflex.com/reflexes#when-to-use-a-stimulusreflex-morph-vs-a-cableready-operation)

## outer\_html

Replaces a DOM element with new HTML.

```ruby
cable_ready["MyChannel"].outer_html(
  cancel:         true|false, # [false]  - cancel the operation (for use on client)
  focus_selector: "string",   # [null]   - string containing a CSS selector
  html:           "string",   # [null]   - the HTML to use as replacement
  select_all:     true|false, # [false]  - operate on list of elements returned from selector
  selector:       "string",   # required - string containing a CSS selector or XPath expression
  xpath:          true|false  # [false]  - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-outer-html`
* `cable-ready:after-outer-html`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML)

## prepend

Inserts HTML into the DOM, inside the target element, before its first child.

```ruby
cable_ready["MyChannel"].prepend(  
  cancel:         true|false, # [false]  - cancel the operation (for use on client)
  focus_selector: "string",   # [null]   - string containing a CSS selector
  html:           "string",   # [null]   - the HTML to assign
  select_all:     true|false, # [false]  - operate on list of elements returned from selector
  selector:       "string",   # required - string containing a CSS selector or XPath expression
  xpath:          true|false  # [false]  - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-prepend`
* `cable-ready:after-prepend`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement](https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement)
* [https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/prepend)

## remove

Removes an element from the DOM.

```ruby
cable_ready["MyChannel"].remove(
  cancel:         true|false, # [false]  - cancel the operation (for use on client)
  focus_selector: "string",   # [null]   - string containing a CSS selector
  select_all:     true|false, # [false]  - operate on list of elements returned from selector
  selector:       "string",   # required - string containing a CSS selector or XPath expression
  xpath:          true|false  # [false]  - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-remove`
* `cable-ready:after-remove`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove](https://developer.mozilla.org/en-US/docs/Web/API/ChildNode/remove)

## replace

Replaces a DOM element with new HTML. This operation is an alias of [outer\_html](dom-mutations.md#outer_html) and has the same implementation.

```ruby
cable_ready["MyChannel"].replace(
  cancel:         true|false, # [false]  - cancel the operation (for use on client)
  focus_selector: "string",   # [null]   - string containing a CSS selector
  html:           "string",   # [null]   - the HTML to use as replacement
  select_all:     true|false, # [false]  - operate on list of elements returned from selector
  selector:       "string",   # required - string containing a CSS selector or XPath expression
  xpath:          true|false  # [false]  - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-replace`
* `cable-ready:after-replace`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/outerHTML)

## text\_content

Sets the text content of a DOM element.

{% hint style="info" %}
CableReady sets `textContent` instead of `innerText`. You can learn more [here](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#Differences_from_innerText), or just move on with your day. ☀️
{% endhint %}

```ruby
cable_ready["MyChannel"].text_content(
  cancel:         true|false,     # [false]  - cancel the operation (for use on client)
  focus_selector: "string",       # [null]   - string containing a CSS selector
  select_all:     true|false,     # [false]  - operate on list of elements returned from selector
  selector:       "string",       # required - string containing a CSS selector or XPath expression
  text:           "string",       # [null]   - the text to assign
  xpath:          true|false      # [false]  - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-text-content`
* `cable-ready:after-text-content`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)

