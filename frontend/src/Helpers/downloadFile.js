// Helpers
import getContentDispositionOrDefault from './getContentDispositionOrDefault';

export function downloadFile(defaultFileName, response) {
  const EMPTY_STRING = '';
  const { Blob, navigator } = window;
  const data = response.data;
  const contentType = response.headers['content-type'];
  const blob = new Blob([data], { type: contentType || EMPTY_STRING });
  const filename = getContentDispositionOrDefault(response, defaultFileName);

  if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, filename);
  } else {
    downloadBlob(filename, blob);
  }
}

export async function downloadFromUrl(fileName, url) {
  const blob = await fetch(url).then((response) => response.blob());
  downloadBlob(fileName, blob);
}

export function downloadBlob(fileName, blob) {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
