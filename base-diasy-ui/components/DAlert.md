#### props

| name    | type   | Default | description              |
| ------- | ------ | ------- | ------------------------ |
| variant | string | -       | background color variant |

#### slots

| name  | description         |
| ----- | ------------------- |
| title | show title of alert |

```vue
<d-alert>
  <template #text>
    <p>Alert Without Variant</p>
  </template>
</d-alert>
<d-alert :variant="DAlertTypes.info">
  <template #text>
    <p>Info Alert</p>
  </template>
</d-alert>
```
