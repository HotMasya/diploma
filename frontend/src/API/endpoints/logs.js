// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import Log from '../../Models/Log';

// Helpers
import { downloadFile } from 'Helpers/downloadFile';

async function findAll(params, requestOptions = {}) {
  return API.instance
    .get('logs', { params, ...requestOptions })
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Log(item)));
}

async function downloadLogs(journalId, requestOptions = {}) {
  return API.instance
    .get('logs/download', { params: { journalId }, ...requestOptions })
    .then((res) => downloadFile(`${journalId} logs.csv`, res));
}

async function getTotalCount(journalId, requestOptions = {}) {
  return API.instance
    .get('logs/count', { params: { journalId }, ...requestOptions })
    .then((res) => res.data);
}

const logs = {
  downloadLogs,
  findAll,
  getTotalCount,
};

export default logs;
