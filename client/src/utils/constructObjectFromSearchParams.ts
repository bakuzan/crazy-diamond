import castStringToBool from './castStringToBool';
import compose from './compose';
import parseIfInt from './parseIfInt';

const parseSearchParamValue = compose(
  (str) => castStringToBool(str, false),
  parseIfInt,
  decodeURIComponent
);

const constructObjectFromSearchParams = (searchParam = ''): any =>
  searchParam
    .slice(1)
    .split('&')
    .reduce((p, c) => {
      const [key, raw] = c.split('=');
      const value = parseSearchParamValue(raw);
      return { ...p, [key]: value };
    }, {});

export default constructObjectFromSearchParams;
