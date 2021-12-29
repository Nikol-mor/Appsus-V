import { utilService } from '../../../../services/util.service.js';
import { StorageService } from '../../../../services/storage.service.js';

export const mailService = {
  query,
};

const email = {
  id: 'e101',
  subject: 'Miss you!',
  body: 'Would love to catch up sometimes',
  isRead: false,
  sentAt: 1551133930594,
  to: 'momo@momo.com',
};

const loggedinUser = {
  email: 'user@appsus.com',
  fullname: 'Mahatma Appsus',
};

function query() {
  return Promise.resolve(email);
}
