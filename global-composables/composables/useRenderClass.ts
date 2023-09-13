import { computed, inject, getCurrentInstance } from "vue";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface TSettings {
  direction: Direction;

  /** Base DaisyUI components */
  DAccordion?: {
    container?: TSettingItem;
    innerContainer?: TSettingItem;
    radioButton?: TSettingItem;
    title?: TSettingItem;
    content?: TSettingItem;
  };
  DAlert?: {
    container?: TSettingItem;
    icon?: TSettingItem;
    text?: TSettingItem;
  };
  DButton?: {
    container?: TSettingItem;
    loadingContainer?: TSettingItem;
    loading?: TSettingItem;
  };
  DCollapsible?: {
    container?: TSettingItem;
    checkbox?: TSettingItem;
    title?: TSettingItem;
    content?: TSettingItem;
  };
  DDropdown?: {
    container?: TSettingItem;
    label?: TSettingItem;
    parentTag?: TSettingItem;
    childTag?: TSettingItem;
  };
  DModal?: {
    dialog?: TSettingItem;
    form?: TSettingItem;
    closeButton?: TSettingItem;
    title?: TSettingItem;
    backdropForm?: TSettingItem;
    backdropCloseButton?: TSettingItem;
  };
  DRating?: {
    container?: TSettingItem;
    icon?: TSettingItem;
    halfIcon?: TSettingItem;
  };

  /** Daisy Forms components */
  VCheckbox?: {
    container?: TSettingItem;
    labelContainer?: TSettingItem;
    messageLabel?: TSettingItem;
    messageSpan?: TSettingItem;
    input?: TSettingItem;
  };
  VToggle?: {
    input?: TSettingItem;
  };
  VRadio?: {
    container?: TSettingItem;
    labelContainer?: TSettingItem;
    input?: TSettingItem;
    label?: TSettingItem;
    messageLabel?: TSettingItem;
    messageSpan?: TSettingItem;
  };
  VSelect?: {
    container?: TSettingItem;
    labelContainer?: TSettingItem;
    label?: TSettingItem;
    select?: TSettingItem;
    placeholder?: TSettingItem;
    option?: TSettingItem;
    messageLabel?: TSettingItem;
    messageSpan?: TSettingItem;
  };
  VTextInput?: {
    container?: TSettingItem;
    labelContainer?: TSettingItem;
    label?: TSettingItem;
    input?: TSettingItem;
    messageLabel?: TSettingItem;
    messageSpan?: TSettingItem;
  };
  VTextarea?: {
    input?: TSettingItem;
  };

  /** Base components */
  TCarousel?: {
    container?: TSettingItem;
    next?: TSettingItem;
    prev?: TSettingItem;
    nextDisabled?: TSettingItem;
    prevDisabled?: TSettingItem;
    wrapper?: TSettingItem;
    pagination?: TSettingItem;
    page?: TSettingItem;
    pageActive?: TSettingItem;
  };
  TCollapsible?: {
    container?: TSettingItem;
  };
  TPagination?: {
    container?: TSettingItem;
    ul?: TSettingItem;
    li?: TSettingItem;
    anchor?: TSettingItem;
    itemContainer?: TSettingItem;
    iconContainer?: TSettingItem;
    icon?: TSettingItem;
    page?: TSettingItem;
  };
  TRangeInput?: {
    input?: TSettingItem;
  };
  TRangeSlider?: {
    container?: TSettingItem;
    innerContainer?: TSettingItem;
    pan?: TSettingItem;
    activePan?: TSettingItem;
    minCircle?: TSettingItem;
    maxCircle?: TSettingItem;
  };
  TSkeleton?: {
    avatarListContainer?: TSettingItem;
    avatarListInnerContainer?: TSettingItem;
    avatarListCircle?: TSettingItem;
    avatarListLine?: TSettingItem;
    imageContainer?: TSettingItem;
    imageInnerContainer?: TSettingItem;
    image?: TSettingItem;
    cardContainer?: TSettingItem;
    cardInnerContainer?: TSettingItem;
    cardImage?: TSettingItem;
    cardLine?: TSettingItem;
    lineContainer?: TSettingItem;
    line?: TSettingItem;
    threeLineContainer?: TSettingItem;
    threeLineInnerContainer?: TSettingItem;
    threeLine?: TSettingItem;
    customContainer?: TSettingItem;
    custom?: TSettingItem;
  };
  TTabItem?: {
    container?: TSettingItem;
    content?: TSettingItem;
  };
  TTable?: {
    cardBreakpoint?: TSettingItem;
    cardContainer?: TSettingItem;
    cardCell?: TSettingItem;
    cardCellInnerContainer?: TSettingItem;
    cardCounter?: TSettingItem;
    cardCollapse?: TSettingItem;
    breakpoint?: TSettingItem;
    container?: TSettingItem;
    innerContainer?: TSettingItem;
    shadowBox?: TSettingItem;
    table?: TSettingItem;
    thead?: TSettingItem;
    headTr?: TSettingItem;
    headCounter?: TSettingItem;
    tbody?: TSettingItem;
    loadingContainer?: TSettingItem;
    tr?: TSettingItem;
    counter?: TSettingItem;
    td?: TSettingItem;
    detailsTr?: TSettingItem;
    detailsTd?: TSettingItem;
  };
  TTableTh?: {
    container?: TSettingItem;
    cardContainer?: TSettingItem;
    innerContainer?: TSettingItem;
    sort?: TSettingItem;
    cardSort?: TSettingItem;
    label?: TSettingItem;
    cardLabel?: TSettingItem;
  };
  TTabs?: {
    container?: TSettingItem;
    headerContainer?: TSettingItem;
    arrow?: TSettingItem;
    nav?: TSettingItem;
    header?: TSettingItem;
  };
  TToast?: {
    message?: TSettingItem;
  };
}

export interface TSettingItem {
  delete?: string[];
  add?: string;
  replace?: { [key: string]: string };
}
export enum Direction {
  rtl = "rtl",
  ltr = "ltr",
}

export const useRenderClass = (componentName: string) => {
  const TSettings = inject<TSettings>("TSettings");
  const instance = getCurrentInstance();
  const renderClass = computed(
    () =>
      (className: string, elementName: string, objectBinding = {}) => {
        const getSettings = computed((): TSettingItem | null => {
          let combinedSettings: TSettingItem | undefined =
            TSettings?.[componentName]?.[elementName];
          const dataDelete = instance?.attrs?.[`data-${elementName}-delete`];
          const dataAdd = instance?.attrs?.[`data-${elementName}-add`];
          if (dataDelete && typeof dataDelete === "string") {
            if (!combinedSettings) {
              combinedSettings = {};
            }
            if (!combinedSettings.delete) {
              combinedSettings.delete = [];
            }
            combinedSettings.delete = [
              ...combinedSettings.delete,
              ...dataDelete.split(" "),
            ];
          }
          if (dataAdd) {
            if (!combinedSettings) {
              combinedSettings = {};
            }
            if (!combinedSettings.add) {
              combinedSettings.add = "";
            }
            combinedSettings.add += " " + dataAdd;
          }
          return combinedSettings || null;
        });
        let result = className;
        for (const k in objectBinding) {
          if (objectBinding[k]) {
            result += " " + k + " ";
          }
        }
        const settings = getSettings.value;
        if (settings) {
          if (settings.add) {
            result += " " + settings.add;
          }
          if (settings.delete) {
            settings.delete.forEach((item) => {
              result = result.replace(item, "");
            });
          }
          if (settings.replace) {
            for (const key in settings.replace) {
              result = result.replace(key, settings.replace[key]);
            }
          }
        }
        return result;
      }
  );

  const attrsToBind = computed(() => {
    const attrs = { ...instance.attrs };
    for (const key in attrs) {
      if (key.endsWith("-add") || key.endsWith("-delete")) {
        delete attrs[key];
      }
    }
    return attrs;
  });
  return { renderClass, attrsToBind };
};
