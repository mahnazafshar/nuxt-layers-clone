import { mixed } from "yup";
import { humanFileSize, checkAspectRatio } from "../helpers/public";
export const useFileValidation = ({
  required = false,
  max = -1,
  min = -1,
  aspectRatio = -1,
}) => {
  const { $t } = useNuxtApp();
  let rule = mixed();
  if (required) {
    rule = rule.test("required", $t("file is required"), (value) => {
      return !!value;
    });
  }
  if (max != -1) {
    rule = rule.test(
      "maxSize",
      $t("file can not be larger than", [humanFileSize(max)]),
      (value) => {
        if (!value) {
          return true;
        }
        return value.size <= max;
      }
    );
  }
  if (min != -1) {
    rule = rule.test(
      "minSize",
      $t("file can not be less than", [humanFileSize(min)]),
      (value) => {
        if (!value) {
          return true;
        }
        return value.size >= min;
      }
    );
  }
  if (aspectRatio != -1) {
    rule = rule.test(
      "aspect",
      $t("file aspect ratio should be", [aspectRatio]),
      async (value) => {
        if (!value) {
          return true;
        }
        const fileAspect = await checkAspectRatio(value);
        return fileAspect == aspectRatio;
      }
    );
  }
  return rule;
};
