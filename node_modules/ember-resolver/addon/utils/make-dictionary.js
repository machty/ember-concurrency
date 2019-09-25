export default function makeDictionary() {
  let cache = Object.create(null);
  cache['_dict'] = null;
  delete cache['_dict'];
  return cache;
}
