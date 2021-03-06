# Sliders

Sliders are unidimensional widgets that output one value at a time.



## Fader
```js
{
    type:'fader',
    // etc
}
```

### `horizontal`
- type: `boolean`
- default: `false`
- usage: set to `true` to display the fader horizontally

### `alignRight`
- type: `boolean`
- default: `false`
- usage: set to `true` to invert the pip's and fader's position

### `noPip`
- type: `boolean`
- default: `false`
- usage: set to `true` to hide the scale

### `compact`
- type: `boolean`
- default: `false`
- usage: set to `true` to display a compact alternative for the widget. Disables default mouse/touch focusing on the value display (right-click/long-touch still triggers it).


### `range`
- type: `object`
- default: `{"min":0,"max":1}`
- usage: `range` defines the breakpoints of the fader's scale
    - keys can be percentages and/or `min` / `max`
    - values can be `number` or `object` if a custom label is needed
- example:
```js
range: {
    "min":0,
    "50%":1,        
    "max": {"inf":10} // "inf" will be used as a custom label on the scale
}
```

### `origin`
- type: `number`
- default: `auto`
- usage: `origin` defines the starting point's value of the fader's gauge

### `logScale`
- type: `boolean`
- default: `false`
- usage: set to `true` use logarithmic scaling between breakpoints (log10)


### `unit`
- type: `string`
- default: `empty`
- usage: `unit` will be appended to the displayed widget's value (it doesn't affect osc messages)


### `snap`
- type: `boolean`
- default: `false`
- usage: by default, dragging the widget will modify it's value starting from its last value. Setting this to `true` will make it snap directly to the mouse/touch position.

### `spring`
- type: `boolean`
- default: `false`
- usage: when set to `true`, the widget will go back to its initial value when released.


### `doubleTap`
- type: `boolean`
- default: `false`
- usage: set to `true` to make the fader reset to its initial value when receiving a double tap

### `meter`
- type: `boolean`
- default: `false`
- usage: set to true to display a vu-meter next in the fader
    - the meter's `id` will be the same as the widget's with `/meter` appended to it
    - the meter's `address `will be the same as the widget's with `/meter` appended to it

### `meterAddress`
- type: `boolean`
- default: `empty`
- usage: overrides the `meter`'s osc address

### `css`
```
--color-gauge:color;
--color-knob:color;
--color-pips:color;
```



## Knob

```js
{
    type:'knob',
    // etc
}
```


### `noPip`
- type: `boolean`
- default: `true`
- usage: set to `false` to show the scale

### `compact`
- type: `boolean`
- default: `false`
- usage: set to `true` to display a compact alternative for the widget. Disables mouse/touch focusing on the value display.

### `angle`
- type: `number`
- default: `270`
- usage: `angle` defines the angle's width of the knob, in degrees

### `range`
- type: `object`
- default: `{"min":0,"max":1}`
- usage: `range` defines the breakpoints of the fader's scale
    - keys can be percentages and/or `min` / `max`
    - values can be `number` or `object` if a custom label is needed
- example:
```js
range: {
    "min":0,
    "50%":1,        
    "max": {"inf":10} // "inf" will be used as a custom label on the scale
}
```

### `origin`
- type: `number`
- default: `auto`
- usage: `origin` defines the starting point's value of the knob's gauge

### `logScale`
- type: `boolean`
- default: `false`
- usage: set to `true` use logarithmic scaling between breakpoints


### `unit`
- type: `string`
- default: `empty`
- usage: `unit` will be appended to the displayed widget's value (it doesn't affect osc messages)


### `snap`
- type: `boolean`
- default: `false`
- usage: by default, dragging the widget *vertically* will modify it's value starting from its last value. Setting this to `true` will make it snap directly to the mouse/touch position.

### `spring`
- type: `boolean`
- default: `false`
- usage: when set to `true`, the widget will go back to its initial value when released.

### `doubleTap`
- type: `boolean`
- default: `false`
- usage: set to `true` to make the knob reset to its initial value when receiving a double tap

### `css`
```
--color-gauge:color;
--color-knob:color;
--color-pips:color;
```

## Encoder

An endless knob that only responds to rotative gestures.

```js
{
    type:'encoder',
    // etc
}
```

### `ticks`
- type: `number`
- default: `360`
- usage: defines the granularity / verbosity of the encoder (number of step for a 360° arc)

### `back`
- type: `string|number|object`
- default: `-1`
- usage: defines which value is sent when rotating the encoder anticlockwise
    - can be an `object` if the type needs to be specified (see [preArgs](../widgets-properties.md#preargs))

### `forth`
- type: `string|number|object`
- default: `1`
- usage: defines which value is sent when rotating the encoder clockwise
    - can be an `object` if the type needs to be specified (see [preArgs](../widgets-properties.md#preargs))

### `release`
- type: `string|number|object`
- default: `empty`
- usage: defines which value is sent when releasing the encoder
    - set to `null` to send send no argument in the osc message
    - can be an `object` if the type needs to be specified (see [preArgs](../widgets-properties.md#preargs))


### `snap`
- type: `boolean`
- default: `false`
- usage: by default, dragging the widget will modify it's value starting from its last value. Setting this to `true` will make it snap directly to the mouse/touch position.

### `doubleTap`
- type: `boolean`
- default: `false`
- usage: set to `true` to make the encoder reset to its initial value when receiving a double tap

### `css`
```
--color-knob:color;
```
