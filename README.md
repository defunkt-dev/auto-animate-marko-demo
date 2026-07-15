# @formkit/auto-animate × Marko — SSR demo

Demo of the official [Marko](https://markojs.com) adapter for
[@formkit/auto-animate](https://github.com/formkit/auto-animate) (shipped in
`@formkit/auto-animate@0.10.0`), running on [@marko/run](https://github.com/marko-js/run),
Marko's SSR meta-framework.

Every page is server-rendered real HTML that Marko *resumes* on the client —
there is no client re-render or hydration pass. View-source any page to see
the initial list rows in the server output.

## Routes

| Route | Demonstrates |
| --- | --- |
| `/` | List basics — animated add / remove / shuffle / reverse with the `<AutoAnimate>` tag |
| `/options` | The `options` attribute — `duration` and `easing`, fast vs slow side by side |
| `/plugin` | A custom plugin function returning `KeyframeEffect`s per action (`add` / `remove` / `remain`) |
| `/enabled` | The reactive `enabled` attribute, driven by a two-way-bound checkbox |
| `/dropdown` | The escape hatch — raw core `autoAnimate()` on a ref, no tag at all |

## Run it

```sh
npm install
npm run dev       # dev server at http://localhost:3000
npm run build     # production build
npm run preview   # serve the production build
```

## Using the adapter in your own app

```marko
import AutoAnimate from "@formkit/auto-animate/marko"

<let/items = [{ id: 1, text: "One" }]>

<ul/listRef>
  <for|item| of=items by="id">
    <li>${item.text}</li>
  </for>
</ul>
<AutoAnimate parent=listRef/>
```

The tag takes three attributes:

- `parent` — a native element tag-variable (e.g. `<ul/listRef>` then `parent=listRef`)
- `options` — an options object (`duration`, `easing`) **or** a plugin function; read once on mount
- `enabled` — reactive boolean; the adapter calls the controller's `enable()`/`disable()` when it changes

## Note on the Vite config

`vite.config.ts` excludes `@formkit/auto-animate` from dependency
prebundling. The published package contains a `.marko` taglib file with a
relative, extensionless import that Vite 8's rolldown-based dependency
optimizer cannot resolve (it applies strict ESM resolution inside a
`type: module` package). Excluding the package lets the Marko plugin compile
the tag instead. Without this you get:

```
[UNRESOLVED_IMPORT] Could not resolve '../index' in
node_modules/@formkit/auto-animate/tags/auto-animate.marko
```

## Open in CodeSandbox

Import this repository directly: `https://codesandbox.io/p/github/<user>/<repo>`
