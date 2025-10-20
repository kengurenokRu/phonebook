import render from './render.js';
import {createRow} from './createElements.js';

const {hoverRow} = render;

const modalControl = (btnAdd, btnClose, formOverlay, table) => {

  const openModal = () => {
    formOverlay.classList.add('is-visible');
  }

  const closeModal = () => {
    formOverlay.classList.remove('is-visible');
  }

  btnAdd.addEventListener('click', () => {
    openModal();
  });

  btnClose.addEventListener('click', () => {
    closeModal();
  });

  formOverlay.addEventListener('click', e => {
    const target = e.target;
    if ((target === formOverlay) ||
      (target.classList.contains('.close'))) {
      closeModal();
    }
  });

  const sortList = (column) => {
    const sortedRows = Array.from(table.rows)
      .slice(1)
      .sort((rowA, rowB) => rowA.cells[column].innerHTML > rowB.cells[column].innerHTML ? 1 : -1);
    table.tBodies[0].append(...sortedRows);
  }

  table.addEventListener('click', e => {
    if (e.target.textContent === 'Имя') {
      sortList(1);
    } else if (e.target.textContent === 'Фамилия') {
      sortList(2);
    };
  });

  return { closeModal, }
};

const deleteControl = (btnDel, list, removeStorage, key) => {
  btnDel.addEventListener('click', () => {
    document.querySelectorAll('.delete').forEach(del => {
      del.classList.toggle('is-visible');
    })
  });

  list.addEventListener('click', e => {
    if (e.target.closest('.del-icon')) {
      e.target.closest('.contact').remove();
      const phone = e.target.closest('.contact').children[3].textContent;
      removeStorage(key, phone);
    }
  });
}

const addContactPage = (contact, list, logo) => {
  const row = createRow(contact);
  list.append(row);
  hoverRow(row, logo);
};

const formControl = (form, list, closeModal, setStorage, key, logo) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    setStorage(key, newContact);
    addContactPage(newContact, list, logo);
    form.reset();
    closeModal();
  });
};

export default {
  modalControl,
  deleteControl,
  formControl,
};