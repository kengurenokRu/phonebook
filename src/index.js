import control from './scripts/control.js';
import { storageControl } from './scripts/serviceStorage.js';

import render from './scripts/render.js';
/*import './css/normalize.min.css';
import './css/bootstrap.min.css';
import './css/style.css';*/
import './scss/index.scss';

const { modalControl, deleteControl, formControl, } = control;
const { hoverRows, renderPhoneBook, renderContacts } = render;

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

  init('#app', 'Анастасия');
}