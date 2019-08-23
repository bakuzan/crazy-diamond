const constructObjectFromSearchParams = (searchParam = ''): any =>
  searchParam
    .slice(1)
    .split('&')
    .reduce((p, c) => {
      const [key, raw] = c.split('=');

      return { ...p, [key]: raw };
    }, {});

export default constructObjectFromSearchParams;
