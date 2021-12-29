import { utilService } from '../../../../services/util.service.js';
import {
  storageService,
  StorageService,
} from '../../../../services/storage.service.js';

export const mailService = {
  query,
  deleteMail,
};
const STORAGE_KEY = 'mailDB';
const gMails = _loadMailsFromStorage() || _createMails();

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
  //adding filterby / filtered mails
  return Promise.resolve(gMails);
}

function deleteMail(mailId) {
  let mails = _loadMailsFromStorage();
  mails = mails.filter((mail) => {
    mail.id === mailId;
  });
  _saveMailsToStorage(mails);
  return Promise.resolve();
}

function _createMail(subject, text, from, to, isRead, isStar, isSent, isDraft) {
  return {
    id: utilService.makeId(),
    subject,
    text,
    from,
    to,
    isRead,
    isStar,
    isSent,
    isDraft,
  };
}

function _createMails() {
  const mails = [
    _createMail(
      "Eli, here's why you should watch",
      'Peaky Blinders on Netflix',
      'Netflix',
      false,
      false,
      false,
      false
    ),
    _createMail(
      'say YES to a discount',
      'in WizAir',
      'WizAir',
      false,
      false,
      false,
      false
    ),
    _createMail(
      'We welcome you to join us',
      'at Car R Us',
      'Netflix',
      false,
      false,
      false,
      false
    ),
  ];
  _saveMailsToStorage(mails);
  return mails;
}

function _saveMailsToStorage(mails) {
  storageService.saveToStorage(STORAGE_KEY, mails);
}

function _loadMailsFromStorage() {
  return storageService.loadFromStorage(STORAGE_KEY);
}
