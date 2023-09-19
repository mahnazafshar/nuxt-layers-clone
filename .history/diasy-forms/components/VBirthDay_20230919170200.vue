<template>
  <div
    data-name="container"
    :class="renderClass('form-control', 'container')"
    v-bind="attrsToBind"
  >
    <label
      v-if="label !== ''"
      data-name="labelContainer"
      :class="
        renderClass('t-row justify-between pb-1.5 px-1', 'labelContainer')
      "
      :for="name"
    >
      <span data-name="label" :class="renderClass('label-text', 'label')">
        {{ label }}
      </span>
    </label>
    <div
      :class="
        renderClass(
          'flex items-start lg:items-stretch lg:space-x-3 lg:space-x-reverse',
          'wrapper'
        )
      "
    >
      <select
        data-name="select"
        :class="renderClass(`select select-bordered  max-w-xs `, 'select')"
        type="select"
        data-crawl="day"
        @change="onchange($event, 'day')"
      >
        <option
          data-name="placeholder"
          :class="renderClass('', 'placeholder')"
          disabled
          selected
        >
          {{ placeholderDay }}
        </option>
        <option
          v-for="(item, index) in days"
          :key="index"
          :value="item"
          :disabled="item.disabled"
          :selected="item == day"
          data-name="option"
          :class="renderClass('', 'option')"
        >
          {{ item }}
        </option>
      </select>
      <select
        data-name="select"
        :class="renderClass(`select select-bordered  max-w-xs `, 'select')"
        type="select"
        data-crawl="month"
        @change="onchange($event, 'month')"
      >
        <option
          data-name="placeholder"
          :class="renderClass('', 'placeholder')"
          disabled
          selected
        >
          {{ placeholderMonth }}
        </option>
        <option
          v-for="(item, index) in months"
          :key="index"
          :value="item.id"
          :disabled="item.disabled"
          :selected="item.id == +month"
          data-name="option"
          :class="renderClass('', 'option')"
        >
          {{ item.name }}
        </option>
      </select>
      <select
        data-name="select"
        :class="renderClass(`select select-bordered  max-w-xs `, 'select')"
        type="select"
        data-crawl="year"
        @change="onchange($event, 'year')"
      >
        <option
          data-name="placeholder"
          :class="renderClass('', 'placeholder')"
          disabled
          selected
        >
          {{ placeholderYear }}
        </option>
        <option
          v-for="(item, index) in years"
          :key="index"
          :value="item"
          :disabled="item.disabled"
          :selected="item == year"
          data-name="option"
          :class="renderClass('', 'option')"
        >
          {{ item }}
        </option>
      </select>
      <label
        data-name="messageLabel"
        :class="
          renderClass('flex items-center min-h-[1.4rem] px-1', 'messageLabel')
        "
      >
        <span
          data-name="messageSpan"
          :class="
            renderClass(
              'label-text-alt text-error text-2xs leading-3',
              'messageSpan'
            )
          "
        >
          {{ errorMessage }}</span
        >
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { useField } from "vee-validate";
export default {
  name: "VBirthDay",
  props: {
    modelValue: {
      type: String,
    },
    label: {
      type: [Boolean, String],
      default: "",
    },
    name: { type: String },
    year_start: {
      type: Number,
      default: 1319,
    },
    year_end: {
      type: Number,
      default: 1390,
    },
    separator: {
      type: String,
      default: "/",
    },
    placeholderDay: {
      type: String,
      default: () => inject("birthday-placeholder-day", "روز"),
    },
    placeholderMonth: {
      type: String,
      default: () => inject("birthday-placeholder-month", "ماه"),
    },
    placeholderYear: {
      type: String,
      default: () => inject("birthday-placeholder-year", "سال"),
    },
  },
  setup(props, { emit }) {
    const days = ref([]) as object[];
    const months: { id: number; name: string; disabled?: boolean }[] = [
      { id: 1, name: "فروردین" },
      { id: 2, name: "اردیبهشت" },
      { id: 3, name: "خرداد" },
      { id: 4, name: "تیر" },
      { id: 5, name: "مرداد" },
      { id: 6, name: "شهریور" },
      { id: 7, name: "مهر" },
      { id: 8, name: "آبان" },
      { id: 9, name: "آذر" },
      { id: 10, name: "دی" },
      { id: 11, name: "بهمن" },
      { id: 12, name: "اسفند" },
    ];
    const years = ref([]) as any;

    //*SECTION - functions
    function convertTwoDigit(val: string) {
      if (parseInt(val) < 10) {
        return "0" + val;
      }
      return val;
    }
    function isLeapYear(year: string) {
      const ary = [1, 5, 9, 13, 17, 22, 26, 30];
      const b = parseInt(year) % 33;
      return ary.includes(b);
    }

    function validate() {
      const timeout = setTimeout(() => {
        if (unref(day) && unref(month) && unref(year)) {
          if (
            (parseInt(unref(month)) > 6 && parseInt(unref(day)) > 30) ||
            (!isLeapYear(unref(year)) &&
              parseInt(unref(month)) == 12 &&
              parseInt(unref(day)) > 29)
          ) {
            day.value = "";
          }
        }
        clearTimeout(timeout);
      });
    }
    // ****************************************
    const {
      value: inputValue,
      errorMessage,
      handleChange,
      setValue,
    } = useField(toRef(props.name), undefined, {
      ...(props.modelValue != undefined
        ? { initialValue: props.modelValue }
        : {}),
      validateOnValueUpdate: false,
    });
    watchEffect(() => {
      emit("update:modelValue", unref(inputValue));
    });
    watch(
      () => props.modelValue,
      (value) => {
        setValue(value);
      }
    );
    // ****************************************
    const day = ref("");
    const month = ref("");
    const year = ref("");

    onMounted(() => {
      const tempDays = [];
      const tempYears = [];
      for (let i = 1; i < 32; i++) {
        tempDays.push(i);
      }

      for (let i = props.year_end; i > props.year_start; i--) {
        tempYears.push(i);
      }

      days.value = tempDays;
      years.value = tempYears;

      if (props.modelValue) {
        const initValue = props.modelValue.split(props.separator);
        console.log("has modelValue", initValue[0]);
        year.value = initValue[0];
        month.value = initValue[1];
        day.value = initValue[2];
      }
    });

    function onchange(event: Event, type: string) {
      switch (type) {
        case "day":
          day.value = convertTwoDigit(event?.target?.value);
          validate();
          break;
        case "month":
          month.value = convertTwoDigit(event?.target?.value);
          validate();
          break;
        case "year":
          year.value = convertTwoDigit(event?.target?.value);
          validate();
          break;
      }
    }

    watch([year, month, day], (value) => {
      if (!value.includes("")) {
        setValue(value.join(props.separator));
      }
    });
    const { renderClass, attrsToBind } = useRenderClass("VBirthDay");
    console.log("type of", typeof years, typeof days);
    return {
      days,
      months,
      years,
      day,
      month,
      year,
      renderClass,
      attrsToBind,
      handleChange,
      inputValue,
      errorMessage,
      onchange,
    };
  },
};
</script>
