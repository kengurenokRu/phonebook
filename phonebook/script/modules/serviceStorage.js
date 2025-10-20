'use strict';

const storageControl = () => {

  const getStorage = (key) => {
    const temp = JSON.parse(localStorage.getItem(key));
    console.log(temp);
    return JSON.parse(localStorage.getItem(key));
  };

  const saveToStarage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }

  const setStorage = (key, obj) => {
    const data = [];
    const tempData = JSON.parse(localStorage.getItem(key));
    if (tempData !== null) {
      data.push(...tempData);
    }
    data.push(obj);
    saveToStarage(key, data);
  };

  const removeStorage = (key, phone) => {
    const data = JSON.parse(localStorage.getItem(key));
    console.log(phone);
    data.forEach((el, index) => {
      if (el.phone == phone) data.splice(index, 1)
    });
    console.log(data);
    saveToStarage(key, data);
  };

  return { getStorage, setStorage, removeStorage, };
}

module.exports = {
  storageControl,
};