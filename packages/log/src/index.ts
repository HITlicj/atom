// ref: https://remysharp.com/2014/05/23/where-is-that-console-log
type methodName = 'log' | 'warn' | 'error' | 'debug';
export function enhanceLog(arr: Array<methodName> = ['log', 'warn']) {
  return arr.forEach(function (method) {
    const oldFn = console[method];
    console[method] = function () {
      let stack: Array<string> = (new Error()).stack?.split(/\n/) || [];
      // Chrome includes a single "Error" line, FF doesn't.
      if (stack[0].indexOf('Error') === 0) {
        stack = stack.slice(1);
      }
      const args: Array<string> = [...arguments, stack[1].trim()];
      return oldFn.apply(console, args);
    };
  });
}
