const V2X = 'v2v_degeview_';

export const clearStorage = () => {
  const locale = localStorage.getItem('umi_locale');
  localStorage.clear();
  sessionStorage.clear();
  if (locale) {
    localStorage.setItem('umi_locale', locale);
  }
};

const token = `${V2X}token`;
export const getToken = () => localStorage.getItem(token);
export const setToken = (data: string) => localStorage.setItem(token, data);
