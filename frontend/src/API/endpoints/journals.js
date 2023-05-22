// Modules
import map from 'lodash/map';

// Api
import API from 'API';

// Models
import Journal from 'Models/Journal';
import Teacher from 'Models/Teacher';

// Helpers
import { downloadFile } from '../../Helpers/downloadFile';

async function findAll(options = {}, requestOptions = {}) {
  return API.instance
    .get('journals', { params: options }, requestOptions)
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Journal(item)));
}

async function findOne(id, requestOptions = {}) {
  return API.instance
    .get(`journals/${id}`, requestOptions)
    .then((res) => new Journal(res.data));
}

async function remove(id, requestOptions = {}) {
  return API.instance.delete(`journals/${id}`, requestOptions);
}

async function create(data, requestOptions = {}) {
  return API.instance
    .post('journals', data, requestOptions)
    .then((res) => new Journal(res.data));
}

async function partialUpdate(id, data, requestOptions = {}) {
  return API.instance
    .patch(`journals/${id}`, data, requestOptions)
    .then((res) => new Journal(res.data));
}

async function update(id, data, requestOptions = {}) {
  return API.instance
    .post(`journals/${id}`, data, requestOptions)
    .then((res) => new Journal(res.data));
}

async function countTotal(search) {
  return API.instance
    .get('journals/count/total', { params: { search } })
    .then((res) => res.data);
}

async function gradesCountTotal(search) {
  return API.instance
  .get('journals/grades/count/total', { params: { search } })
  .then((res) => res.data);
}

async function updateCell(id, data, requestOptions = {}) {
  return API.instance.patch(`journals/${id}/cells`, data, requestOptions);
}

async function getStudentGrades(options = {}, requestOptions = {}) {
  return API.instance
    .get('journals/grades', { params: options }, requestOptions)
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Journal(item)));
}

async function getStudentGradeDetails(journalId, requestOptions = {}) {
  return API.instance
    .get(`journals/grades/${journalId}`)
    .then((res) => new Journal(res.data));
}

async function downloadJournalCsv(journalId, requestOptions = {}) {
  return API.instance
    .get(`journals/${journalId}/csv`)
    .then((res) => downloadFile(`${journalId}.csv`, res));
}

async function updateHelpers(journalId, data, requestOptions = {}) {
  return API.instance.post(
    `journals/${journalId}/helpers`,
    data,
    requestOptions
  );
}

async function findHelpers(journalId, requestOptions = {}) {
  return API.instance
    .get(`journals/${journalId}/helpers`, requestOptions)
    .then((res) => res.data)
    .then((data) => map(data, (item) => new Teacher(item)));
}

const journals = {
  countTotal,
  create,
  downloadJournalCsv,
  findAll,
  findHelpers,
  findOne,
  gradesCountTotal,
  getStudentGradeDetails,
  getStudentGrades,
  partialUpdate,
  remove,
  update,
  updateCell,
  updateHelpers,
};

export default journals;
