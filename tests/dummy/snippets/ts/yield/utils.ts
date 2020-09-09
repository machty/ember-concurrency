export type JSON = string | number | boolean | null | JSONArray | JSONObject;
export interface JSONArray extends Array<JSON> {}
export interface JSONObject extends Record<string, JSON> {}
