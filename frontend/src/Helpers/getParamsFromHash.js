export function getParamsFromHash() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams();

  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(hash)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return params;
}
