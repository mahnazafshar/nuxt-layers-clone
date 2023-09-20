import { unref } from "vue";
import { MaybeRef } from "../utils/files.types";
export const picObjectFieldsFromSchema = (
  object: Record<string, any>,
  schema: MaybeRef<any>
) => {
  const result: Record<string, any> = {};
  Object.keys(unref(schema).fields).forEach((key) => {
    if (object[key] != undefined) {
      result[key] = object[key];
    }
  });
  return result;
};
export const humanFileSize = (bytes, si = false, dp = 1) => {
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;
  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );
  return bytes.toFixed(dp) + " " + units[u];
};
export const checkAspectRatio = (value) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(value);
    reader.onload = function (value) {
      const img = new Image();
      //@ts-ignore
      img.src = value.target.result;
      img.onload = function () {
        //@ts-ignore
        const aspectRatio = this.width / this.height;
        resolve(aspectRatio);
      };
    };
  });
};
