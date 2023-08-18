const observerConfig = { childList: true, subtree: true };

const observer = (count, countLimit, timeout, delay, fgFunction) =>
  new MutationObserver(function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fgFunction();
    }, delay);
    if (count < countLimit) {
      count++;
    } else {
      observer.disconnect();
    }
    console.log("count: ", count);
  });

export { observerConfig, observer };
