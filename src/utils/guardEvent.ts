export default function guardEvent(e: MouseEvent) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
    return;
  }

  // don't redirect when preventDefault called
  if (e.defaultPrevented) {
    return;
  }

  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) {
    return;
  }

  // don't redirect if `target="_blank"`
  const et = e.currentTarget as HTMLElement;
  if (et && et.getAttribute) {
    const target = et.getAttribute('target') || '';

    if (/\b_blank\b/i.test(target)) {
      return;
    }
  }

  e.preventDefault();
  return true;
}
