const xor: Object = {
  key: 2,
  encode(str: String | undefined, key: Number | String | undefined) {
    if (!key) key = xor.key;
    if (!str) return str;
    var encoded = encodeURIComponent((str).split('').map((char,ind)=>ind%key?String.fromCharCode(char.charCodeAt()^key):char).join(''));
    if (!encoded.endsWith('/')) return encoded+'/';
    else return encoded
  },
  decode(str: String | undefined, key: Number | String | undefined) {
    if (!key) key = xor.key;
    if (!str) return str;
    str = str.replace(new RegExp('\/$', 'g'), '');
    var encoded = (decodeURIComponent(str).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    return encoded;
  }
}

const illusive: Object = {
  encode(str: String | undefined, key: Number | undefined = 2) {
    var letters = 'a1b2c3d4e5f6g7h8i9jklmnopqrstuvwxyza1b2c3d4e5f6g7h8i9jklmnopqrstuvwxyz';return str?encodeURIComponent(str.toString().split('').map(e=>letters.indexOf(e)>-1?letters[letters.indexOf(e) + key]:e).join('')):str;
  },
  decode(str: String | undefined, key: Number | undefined = 2) {
    var letters = 'a1b2c3d4e5f6g7h8i9jklmnopqrstuvwxyza1b2c3d4e5f6g7h8i9jklmnopqrstuvwxyz';return str?decodeURIComponent(str).toString().split('').map(e=>letters.indexOf(e)>-1?letters[letters.indexOf(e) - key]:e).join(''):str;
  }
}

const plain: Object = {
  encode(str: String | undefined) {
    if (!str) return str;
    var encoded = (str)
    return encoded;
  },
  decode(str: String | undefined) {
    if (!str) return str;
    var encoded = decodeURIComponent(decodeURIComponent(str));
    return str.replace('https://','https:/').replace('https:/','https://');
  }
}

const base64: Object = {
  encode(str: String | undefined, encode: Boolean | undefined = true) {
    if (!str) return str;
    var encoded = btoa(encode?encodeURIComponent(str):str);
    if (!encoded.endsWith('/')) return encoded+'/';
    else return encoded
  },
  decode(str: String | undefined) {
    if (!str) return str;
    str = str.replace(new RegExp('\/$', 'g'), '');
    var encoded = decodeURIComponent(atob(str));
    return encoded;
  }
}

export default {xor, plain, base64, illusive};