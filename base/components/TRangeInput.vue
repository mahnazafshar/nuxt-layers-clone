<template>
  <input
    data-name="input"
    :value="modelValue"
    :min="min"
    :max="max"
    type="range"
    :step="step"
    :class="renderClass('styled-slider slider-progress', 'input', { 'ltr transform rotate-180': getIsLtr })"
    :style="{
      '--value': modelValue,
      '--min': min,
      '--max': max,
      '--color': color,
    }"
    v-bind="attrsToBind"
    @input="$emit('update:modelValue', +$event.target.value)"
  >
</template>

<script lang="ts">
export default defineComponent({
  name: "TRangeInput",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
    },
    min: {
      type: Number,
      default: ()=> inject('t-range-input-min', 0),
    },
    max: {
      type: Number,
      default: ()=> inject('t-range-input-max', 100),
    },
    step: {
      type: Number,
      default: ()=> inject('t-range-input-step', 1),
    },
    ltr: {
      type: Boolean,
    },
    color: {
      type: String,
      default: ()=> inject('t-range-input-color', '#377DFF'),
    },
  },
  setup(props) {
    const { renderClass, attrsToBind } = useRenderClass("TRangeInput");
    const { isLtr } = useDirection();
    const getIsLtr = computed(() => {
      return !!(props.ltr || unref(isLtr));
    });
    return { getIsLtr, renderClass, attrsToBind };
  },
});
</script>

<style>
input[type="range"].styled-slider {
  height: 2.2em;
  -webkit-appearance: none;
}

/*progress support*/
input[type="range"].styled-slider.slider-progress {
  --range: calc(var(--max) - var(--min));
  --ratio: calc((var(--value) - var(--min)) / var(--range));
  --sx: calc(0.5 * 2em + var(--ratio) * (100% - 2em));
}

input[type="range"].styled-slider:focus {
  outline: none;
}

/*webkit*/
input[type="range"].styled-slider::-webkit-slider-thumb {
  width: 1.5em;
  /* height: 2em; */
  height: 1.5em;
  border-radius: 1em;
  background: var(--color);
  border: 2px solid white;
  box-shadow: 0 0 2px #fcfcfc;
  margin-top: calc(max((1em - 1px - 1px) * 0.5, 0px) - 2em * 0.5);
  -webkit-appearance: none;
}

input[type="range"].styled-slider::-webkit-slider-runnable-track {
  /* height: 1em; */
  height: 0.5em;
  border-radius: 0.25em;
  background: #efefef;
  box-shadow: none;
}

input[type="range"].styled-slider::-webkit-slider-thumb:active {
  background: var(--color);
}

input[type="range"].styled-slider:active::-webkit-slider-runnable-track {
  background: #f5f5f5;
  border-color: #c1c1c1;
}

input[type="range"].styled-slider.slider-progress::-webkit-slider-runnable-track {
  background: linear-gradient(var(--color), var(--color)) 0 / var(--sx) 100%
      no-repeat,
    #efefef;
}

input[type="range"].styled-slider.slider-progress:active::-webkit-slider-runnable-track {
  background: linear-gradient(var(--color), var(--color)) 0 / var(--sx) 100%
      no-repeat,
    #f5f5f5;
}

/*mozilla*/
input[type="range"].styled-slider::-moz-range-thumb {
  width: 1.5em;
  height: 1.5em;
  border-radius: 1em;
  background: var(--color);
  border: 2px solid white;
}

input[type="range"].styled-slider::-moz-range-track {
  height: max(calc(0.5em - 1px - 1px), 0px);
  border-radius: 0.5em;
  background: #efefef;
  box-shadow: none;
}

input[type="range"].styled-slider::-moz-range-thumb:active {
  background: var(--color);
}

input[type="range"].styled-slider:active::-moz-range-track {
  background: #f5f5f5;
  border-color: #c1c1c1;
}

input[type="range"].styled-slider.slider-progress::-moz-range-track {
  background: linear-gradient(var(--color), var(--color)) 0 / var(--sx) 100%
      no-repeat,
    #efefef;
}

input[type="range"].styled-slider.slider-progress:active::-moz-range-track {
  background: linear-gradient(var(--color), var(--color)) 0 / var(--sx) 100%
      no-repeat,
    #f5f5f5;
}

/*ms*/
input[type="range"].styled-slider::-ms-fill-upper {
  background: transparent;
  border-color: transparent;
}

input[type="range"].styled-slider::-ms-fill-lower {
  background: transparent;
  border-color: transparent;
}

input[type="range"].styled-slider::-ms-thumb {
  width: 1.5em;
  height: 1.5em;
  border-radius: 1em;
  background: var(--color);
  border: 2px solid white;
  margin-top: 0;
  box-sizing: border-box;
}

input[type="range"].styled-slider::-ms-track {
  height: 0.5em;
  border-radius: 0.5em;
  background: #efefef;
  box-shadow: none;
  box-sizing: border-box;
}

input[type="range"].styled-slider::-ms-thumb:active {
  background: var(--color);
}

input[type="range"].styled-slider:active::-ms-track {
  background: #f5f5f5;
  border-color: #c1c1c1;
}

input[type="range"].styled-slider.slider-progress::-ms-fill-lower {
  height: max(calc(1em - 1px - 1px), 0px);
  border-radius: 0.5em 0 0 0.5em;
  margin: -1px 0 -1px -1px;
  background: var(--color);
  border-right-width: 0;
}

input[type="range"].styled-slider.slider-progress:active::-ms-fill-lower {
  background: var(--color);
  border-color: #c1c1c1;
}
</style>
