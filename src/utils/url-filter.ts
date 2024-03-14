export const getDomain = (url: string) => {
  const domain = url.match(/^(?:https?:\/\/)?(?:www\.)?([^:/\n]+)/im);
  return domain ? domain[1] : '';
}

export const cutTheProtocol = (url: string) => {
  return url.replace(/(^\w+:|^)\/\//, '').replace(/^www\./, '');
}
export const getEndDomain = (url: string) => {
  const domain = getDomain(url);
  return domain.split('.').pop();
}


export const filterByDomain = (crrUrl: string, filterUrl: string) => {
  const crrDomain = getDomain(crrUrl);
  const filterDomain = getDomain(filterUrl);
  return crrDomain === filterDomain;
}

export const filterByEndDomain = (crrUrl: string, filterUrl: string) => {
  const crrEndDomain = getEndDomain(crrUrl);
  const filterEndDomain = getEndDomain(filterUrl);
  return crrEndDomain === filterEndDomain;
}

export const filterByUrl = (crrUrl: string, filterUrl: string) => {
  const _crrUrl = cutTheProtocol(crrUrl);
  const _filterUrl = cutTheProtocol(filterUrl);
  return _crrUrl.startsWith(_filterUrl);
}

export const filterByKeyWord = (crrUrl: string, filterUrl: string) => {
  return crrUrl.includes(filterUrl);
}

export const validateUrl = (url: string) => {
  const reg = /^(http|https):\/\/[^ "]+$/;
  return reg.test(url);
}

export const validateDomain = (domain: string) => {
  const reg = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/;
  return reg.test(domain);
}

export const validateEndDomain = (domain: string) => {
  const reg = /^\.[a-z]{2,}$/;
  return reg.test(domain);
}

export const validateKeyWord = (keyWord: string) => {
  return keyWord.length > 0;
}
