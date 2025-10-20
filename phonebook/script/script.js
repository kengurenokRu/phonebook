'use strict';

/*const data = [
  {
    name: 'Иван',
    surname: 'Петров',
    phone: '+79514545454',
  },
  {
    name: 'Игорь',
    surname: 'Семёнов',
    phone: '+79999999999',
  },
  {
    name: 'Семён',
    surname: 'Иванов',
    phone: '+79800252525',
  },
  {
    name: 'Мария',
    surname: 'Попова',
    phone: '+79876543210',
  },
];*/

{
  /*const addContactData = (contact) => {
    data.push(contact);
  };*/

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };

  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
  };

  const createFooter = () => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerContainer = createContainer();
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;
    return footer;
  };

  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;
    return h1;
  };

  const createFooterText = title => {
    const p = document.createElement('p');
    p.textContent = `Все права защищены © ${title}`;
    return p;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
  };

  const createButtonGroup = params => {
    const btnWapper = document.createElement('div');
    btnWapper.classList.add('btn-wrapper');

    const btns = params.map(({ className, type, text }) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });
    btnWapper.append(...btns);

    return {
      btnWapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-stripped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
   <tr>
   <th class = "delete">Удалить</th>
   <th>Имя</th>
   <th>Фамилия</th>
   <th>Телефон</th>
   <th>Редактировать</th>
   </tr>`);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
  <button class = "close" type = "button"></button>
  <h2 class = "form-title">Добавить контакт</h2>
  <div class = "form-group">
  <label class = "form-label" for = "name">Имя:</label>
  <input class = "form-input" name = "name" 
  id = "name" type = "text" requered>
  </div>
  <div class = "form-group">
  <label class = "form-label" for = "surname">Фамилия:</label>
  <input class = "form-input" name = "surname" 
  id = "surname" type = "text" requered>
  </div>
  <div class = "form-group">
  <label class = "form-label" for = "phone">Телефон:</label>
  <input class = "form-input" name = "phone" 
  id = "phone" type = "number" requered>
  </div>  
  `);

    const buttonGroup = createButtonGroup([{
      className: 'btn btn-primary mr-3',
      type: 'submit',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'reset',
      text: 'Отмена',
    }]);
    form.append(...buttonGroup.btns);

    overlay.append(form);
    return {
      overlay,
      form
    }
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonGroup([{
      className: 'btn btn-primary mr-3',
      type: 'button',
      text: 'Добавить',
    },
    {
      className: 'btn btn-danger',
      type: 'button',
      text: 'Удалить',
    }]);

    const table = createTable();
    const { form, overlay } = createForm();
    header.headerContainer.append(logo);

    const footer = createFooter();
    const footerText = createFooterText(title);
    footer.footerContainer.append(footerText);

    main.mainContainer.append(buttonGroup.btnWapper, table, overlay);
    app.append(header, main, footer);

    return {
      list: table.tbody,
      logo,
      btnAdd: buttonGroup.btns[0],
      btnDel: buttonGroup.btns[1],
      overlay,
      form,
      btnClose: form[0],
      table,
    };
  };

  const createRow = ({ name: firstName, surname, phone }) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');

    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);

    const tdName = document.createElement('td');
    tdName.textContent = firstName;

    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;

    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tdPhone.append(phoneLink);

    const tdEdit = document.createElement('td');
    tdEdit.classList.add('edit');
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('edit-icon');
    tdEdit.append(buttonEdit);

    tr.phoneLink = phoneLink;




    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);

    return tr;
  }

  const renderContacts = (elem, data) => {
    console.log(data);
    if (data !== null) {
      if (!Array.isArray(data)) {
        const row = createRow(data);
        elem.append(row);
        return [row];
      }
      else {
        const allRow = data.map(createRow);
        elem.append(...allRow);
        return allRow;
      }
    }
    else return null;
  }

  const hoverRow = (row, logo) => {
    const text = logo.textContent;
    row.addEventListener('mouseenter', () => {
      logo.textContent = row.phoneLink.textContent;
    });
    row.addEventListener('mouseleave', () => {
      logo.textContent = text;
    });
  }

  const hoverRows = (allRows, logo) => {

    if (allRows !== null) {
      allRows.forEach(contact => {
        hoverRow(contact, logo);
      });
    }
  }

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


  const storageControl = () => {
    const getStorage = (key) => {
      return JSON.parse(localStorage.getItem(key));
    };

    const setStorage = (key, obj) => {
      const data = [];
      const tempData = JSON.parse(localStorage.getItem(key));
      if (tempData !== null) {
        data.push(...tempData);
      }
      data.push(obj);
      localStorage.setItem(key, JSON.stringify(data));
    };

    const removeStorage = (key, phone) => {
      const data = JSON.parse(localStorage.getItem(key));
      console.log(phone);
      data.forEach((el, index) => {
        if (el.phone == phone) data.splice(index, 1)
      });
      console.log(data);
      localStorage.setItem(key, JSON.stringify(data));
    };

    return { getStorage, setStorage, removeStorage, };
  }

  const init = (selectorApp, title) => {
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