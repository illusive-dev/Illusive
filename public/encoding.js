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

const dillusive = {
  encode:(e,n=2)=>(l="a1b2c3d4e5f6g7h8i9jklmnopqrstuvwxyza1b2c3d4e5f6g7h8i9jklmnopqrstuvwxyz",e?encodeURIComponent(e.toString().split("").map(e=>l.indexOf(e)>-1?l[l.indexOf(e)+n]:e).join("")):e),
  decode:(e,n=2)=>(l="a1b2c3d4e5f6g7h8i9jklmnopqrstuvwxyza1b2c3d4e5f6g7h8i9jklmnopqrstuvwxyz",e?decodeURIComponent(e).toString().split("").map(e=>l.indexOf(e)>-1?l[l.indexOf(e)-n]:e).join(""):e)
};

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