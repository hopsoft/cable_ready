# Browser Manipulations

## clear\_storage

Removes all key/values pair on the local persistant storage of the user's browser. Defaults to local storage, which is saved across browser sessions. Specify `type: 'session'` if session storage is desired.

Data stored in either local or session storage is specific to the protocol of the page.

```ruby
cable_ready["MyChannel"].clear_storage(
  cancel: true|false, # [false]   - cancel the operation (for use on client)
  type:   "session"   # ["local"] - local storage vs session storage
)
```

#### Life-cycle Callback Events

* `cable-ready:before-clear-storage`
* `cable-ready:after-clear-storage`

Life-cycle events for `clear_storage` are raised on `document`.

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* [https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

## go

Load a specific page from the session history. You can use it to move forwards and backwards through the history depending on the value of a parameter. 

`delta` is the position in the history to which you want to move, relative to the current page. A negative value moves backwards, a positive value moves forwards. `delta: -1` is equivalent to pressing the browsers "Back" button.

If no value is passed or if `delta` equals `0`, it has the same result as calling `location.reload()`.

```ruby
cable_ready["MyChannel"].go(
  cancel: true|false, # [false]  - cancel the operation (for use on client)
  delta:  Integer     # optional integer
)
```

#### Life-cycle Callback Events

* `cable-ready:before-go`
* `cable-ready:after-go`

Life-cycle events for `go` are raised on `window`. Add a listener for the [`popstate`](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) event in order to determine when the navigation has completed.

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/History/go](https://developer.mozilla.org/en-US/docs/Web/API/History/go)
* [https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate\_event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)

## push\_state

Add an entry to the browser's session history stack.

This is similar to setting `window.location = "#foo"` in that both will also create and activate another history entry associated with the current document. The new URL can be any URL in the same origin as the current URL.

You can associate arbitrary data with your new history entry by passing a Hash to the optional `state` parameter.

```ruby
cable_ready["MyChannel"].push_state(
  cancel: true|false, # [false]  - cancel the operation (for use on client)
  url:    "/",        # required - URL String
  title:  "Home",     # [""]     - optional String
  state:  {}          # [{}]     - optional Hash
)
```

{% hint style="warning" %}
 Note that `push_state` never causes a [`hashchange`](https://developer.mozilla.org/en-US/docs/Web/Events/hashchange) event to be fired, even if the new URL differs from the old URL only in its hash.
{% endhint %}

#### Life-cycle Callback Events

* `cable-ready:before-push-state`
* `cable-ready:after-push-state`

Life-cycle events for `push_state` are raised on `window`. Add a listener for the [`popstate`](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) event in order to determine when the navigation has completed.

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/History/pushState](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
* [https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate\_event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)

## remove\_storage\_item

Remove a key/value pair on the local persistant storage of the user's browser. Defaults to local storage, which is saved across browser sessions. Specify `type: 'session'` if session storage is desired.

Data stored in either local or session storage is specific to the protocol of the page. Integer keys are automatically converted to strings.

```ruby
cable_ready["MyChannel"].remove_storage_item(
  cancel: true|false, # [false]   - cancel the operation (for use on client)
  key:    "string",   # required
  type:   "session"   # ["local"] - local storage vs session storage
)
```

#### Life-cycle Callback Events

* `cable-ready:before-remove-storage-item`
* `cable-ready:after-remove-storage-item`

Life-cycle events for `remove_storage_item` are raised on `document`.

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* [https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

## replace\_state

Modify the current browser history entry. The browser will not load the page specified by the `url` and indeed, it doesn't actually have to exist.

You can associate arbitrary data with the history entry by passing a Hash to the optional `state` parameter.

{% hint style="info" %}
Most of the time, you probably want to use `push_state`.
{% endhint %}

```ruby
cable_ready["MyChannel"].replace_state(
  cancel: true|false, # [false]  - cancel the operation (for use on client)
  url:    "/",        # required - URL String
  title:  "Home",     # [""]     - optional String
  state:  {}          # [{}]     - optional Hash
)
```

#### Life-cycle Callback Events

* `cable-ready:before-replace-state`
* `cable-ready:after-replace-state`

Life-cycle events for `replace_state` are raised on `window`. Add a listener for the [`popstate`](https://developer.mozilla.org/en-US/docs/Web/Events/popstate) event in order to determine when the navigation has completed.

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)
* [https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate\_event](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)

## scroll\_into\_view

Scroll the viewport so that the element with the specified anchor \(`id` attribute\) is in view.

```markup
<div id="i-am-an-anchor">⚓</div>
```

The default behavior is to instantly jump to the element such that the top of the element is touching the top of the browser viewport.

{% hint style="success" %}
If you're looking for a more _human_ experience, give `behavior: "smooth", block: "center"` a try.
{% endhint %}

```ruby
cable_ready["MyChannel"].scroll_into_view(
  behavior: "string",   # ["auto"]    - auto or smooth
  block:    "string",   # ["start"]   - start, center, end, nearest
  cancel:   true|false, # [false]     - cancel the operation (for use on client)
  inline:   "string",   # ["nearest"] - start, center, end, nearest
  selector: "string",   # required    - string containing a CSS selector or XPath expression
  xpath:    true|false  # [false]     - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-scroll-into-view`
* `cable-ready:after-scroll-into-view`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)

## set\_cookie

Writes a cookie to the document cookie store.

```ruby
cable_ready["MyChannel"].set_cookie(
  cancel: true|false, # [false]  - cancel the operation (for use on client)
  cookie: "string"    # required - "example=value; path=/; expires=Sat, 07 Mar 2020 16:19:19 GMT"
)
```

{% hint style="info" %}
Note that you can only set/update a single cookie at a time using this method.
{% endhint %}

#### Life-cycle Callback Events

* `cable-ready:before-set-cookie`
* `cable-ready:after-set-cookie`

Life-cycle events for `set_cookie` are raised on `document`.

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)

## set\_focus

Set focus on the specified element, if it can be focused. The focused element is the element which will receive keyboard and similar events by default.

```ruby
cable_ready["MyChannel"].set_focus(
  cancel:   true|false, # [false]  - cancel the operation (for use on client)
  selector: "string",   # required - string containing a CSS selector or XPath expression
  xpath:    true|false  # [false]  - process the selector as an XPath expression
)
```

#### Life-cycle Callback Events

* `cable-ready:before-set-focus`
* `cable-ready:after-set-focus`

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/focus)

## set\_storage\_item

Create or update a key/value pair on the local persistant storage of the user's browser. Defaults to local storage, which is saved across browser sessions. Specify `type: 'session'` if session storage is desired.

Data stored in either local or session storage is specific to the protocol of the page. Integer keys are automatically converted to strings.

```ruby
cable_ready["MyChannel"].set_storage_item(
  cancel: true|false, # [false]  - cancel the operation (for use on client)
  key:    "string",   # required
  value:  "string",   # required
  type:   "session"   # ["local"] - local storage vs session storage
)
```

#### Life-cycle Callback Events

* `cable-ready:before-set-storage-item`
* `cable-ready:after-set-storage-item`

Life-cycle events for `set_storage_item` are raised on `document`.

#### Reference

* [https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
* [https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)

