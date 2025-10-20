import * as createElements from './createElements.js';

const {
  createHeader,
  createFooter,
  createLogo,
  createFooterText,
  createMain,
  createButtonGroup,
  createTable,
  createForm,
  createRow,
} = createElements;

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

const renderContacts = (elem, data) => {
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

export default {
  hoverRow,
  hoverRows,
  renderPhoneBook,
  renderContacts,
};