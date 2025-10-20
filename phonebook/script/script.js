'use strict';

const {
  modalControl,
  deleteControl,  
  formControl,
} = require('./modules/control.js');

const {
  storageControl,
} = require('./modules/serviceStorage.js');

const {
  hoverRows,
  renderPhoneBook,
  renderContacts,
} = require('./modules/render.js');



{
  const init = (selectorApp, title) => {
    //localStorage.clear();
    const key = 'Анастасия';
    const app = document.querySelector(selectorApp);
    const {
      list,
      logo,
      btnAdd,
      btnDel,
      overlay,
      form,
      btnClose,
      table,
    } = renderPhoneBook(app, title);
    const { getStorage, setStorage, removeStorage } = storageControl();
    const data = getStorage(key);
    const allRows = renderContacts(list, data);
    const { closeModal } = modalControl(btnAdd, btnClose, overlay, table);

    //функционал
    hoverRows(allRows, logo);

    deleteControl(btnDel, list, removeStorage, key);
    formControl(form, list, closeModal, setStorage, key, logo);
  };

  window.phoneBookInit = init;
}