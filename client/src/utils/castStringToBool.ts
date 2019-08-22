const castStringToBool = (val: string, force = true): boolean | string => {
  if (val === 'true') {
    return true;
  } else if (val === 'false') {
    return false;
  }

  return force ? !!val : val;
};

export default castStringToBool;
