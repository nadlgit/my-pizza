export function regexEscape(str: string, ignoreCase = false) {
  //TODO: handle escape of '(', ')', etc
  return new RegExp(str, ignoreCase ? 'i' : undefined);
}
