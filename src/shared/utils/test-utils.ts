export function regexEscape(str: string, ignoreCase = false) {
  const escapedStr = str.replace(/[()+]/g, '\\$&');
  return new RegExp(escapedStr, ignoreCase ? 'i' : undefined);
}
