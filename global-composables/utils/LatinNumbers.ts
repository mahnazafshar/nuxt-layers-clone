export function latinNumber(val) {
  val = val?.replace?.(/۰/g, "0");
  val = val?.replace?.(/۱/g, "1");
  val = val?.replace?.(/۲/g, "2");
  val = val?.replace?.(/۳/g, "3");
  val = val?.replace?.(/۴/g, "4");
  val = val?.replace?.(/۵/g, "5");
  val = val?.replace?.(/۶/g, "6");
  val = val?.replace?.(/۷/g, "7");
  val = val?.replace?.(/۸/g, "8");
  val = val?.replace?.(/۹/g, "9");
  return val;
}
