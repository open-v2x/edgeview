const V2X = 'v2v_console_';

export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

const token = `${V2X}token`;
export const getToken = () => localStorage.getItem(token);
export const setToken = (data: string) => localStorage.setItem(token, data);
