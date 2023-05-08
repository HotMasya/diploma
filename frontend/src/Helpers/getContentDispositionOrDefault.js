const EMPTY_STRING = '';

function getContentDispositionOrDefault(response, defaultFileName) {
  const contentDisposition = response.headers['content-disposition'];

  let filename = defaultFileName;
  if (contentDisposition) {
    const fileNameMatch = contentDisposition.match(/filename\*=UTF-8''(.+)/);
    if (fileNameMatch && fileNameMatch.length === 2) {
      filename = fileNameMatch[1].replace(/"/g, EMPTY_STRING);
    }
  }

  return decodeURIComponent(filename);
}

export default getContentDispositionOrDefault;
