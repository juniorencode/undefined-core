export function within(min, value, max) {
  return Math.max(min, Math.min(value, max));
}
export function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}
