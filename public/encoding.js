const dxor = {
  key: 2,
  encode(str, key) {
    if (!key) key = xor.key;
    if (!str) return str;
    var encoded = encodeURIComponent((str).split('').map((char,ind)=>ind%key?String.fromCharCode(char.charCodeAt()^key):char).join(''));
    if (!encoded.endsWith('/')) return encoded+'/';
    else return encoded
  },
  decode(str, key) {
    if (!key) key = xor.key;
    if (!str) return str;
    str = str.replace(new RegExp('\/$', 'g'), '');
    var encoded = (decodeURIComponent(str).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    return encoded;
  }
}

const dplain = {
  encode(str) {
    if (!str) return str;
    var encoded = (str)
    return encoded;
  },
  decode(str) {
    if (!str) return str;
    var encoded = decodeURIComponent(decodeURIComponent(str));
    return str.replace('https://','https:/').replace('https:/','https://');
  }
}

const dbase64 = {
  encode(str) {
    if (!str) return str;
    var encoded = btoa(encodeURIComponent(str));
    if (!encoded.endsWith('/')) return encoded+'/';
    else return encoded
  },
  decode(str) {
    if (!str) return str;
    str = str.replace(new RegExp('\/$', 'gi'), '');
    var encoded = decodeURIComponent(atob(str));
    return encoded;
  }
}