# DAlert

DAlert informs users about important events.

## props

| name    | type        | Default | description              |
| ------- | ----------- | ------- | ------------------------ |
| variant | DAlertTypes | -       | background color variant |
| text    | string      | -       | content of alert         |

## slots

| name  | description         |
| ----- | ------------------- |
| title | show title of alert |

## with variant prop

```vue
<d-alert :variant="DAlertTypes.info" text="Info"></d-alert>
```

## with slot

```vue
<d-alert>
  <template #text>
    <p>Alert Without Variant</p>
  </template>
</d-alert>
```
