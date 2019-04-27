export const uuid = () => {
  var buf = new Uint32Array(4);
  window.crypto.getRandomValues(buf);
  var idx = -1;
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    idx++;
    var r = (buf[idx >> 3] >> ((idx % 8) * 4)) & 15;
    var v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
