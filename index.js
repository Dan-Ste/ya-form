const MyForm = (function () {

  /**
   * @type {HTMLElement}
   */
  const _fromElem = document.getElementById('myForm');

  /**
   * @type {HTMLElement}
   */
  const _resultContainer = document.getElementById('resultContainer');

  let _mockedResponse = success;

  /**
   * Add listener on form submit
   */
  const init = () => {
    _fromElem.addEventListener('submit', submit);
  };

  /**
   * Gets data from form fields
   * @param {undefined}
   * @return {Object} - data from the form in the form - inputName: inputValue
   */
  const getData = () => {
    const data = {};

    [].forEach.call(_fromElem.elements, elem => {
      if (elem.type !== 'submit') {
        data[elem.name] = elem.value;
      }
    });

    return data;
  };

  /**
   * Sets data to form fields
   * @param {Object} data - data to be set to the form
   * @return {undefined}
   */
  const setData = (data) => {
    Object.keys(data).forEach(key => {
      _fromElem[key].value = data[key];
    });
  };

  /**
   * @typedef {Object} ValidationResult
   * @property {Boolean} isValid - result of the validation
   * @property {Array} errorFields - form fields with error
   * 
   * Validates form
   * @param {undefined}
   * @return {ValidationResult} - validation meta info 
   * 
   */
  const validate = () => {
    const formData = getData();
    const errorFields = [];
    const isFioValid = _validateFio(formData['fio']);
    const isEmailValid = _validateEmail(formData['email']);
    const isPhoneValid = _validatePhone(formData['phone']);

    isFioValid || errorFields.push('fio');
    isEmailValid || errorFields.push('email');
    isPhoneValid || errorFields.push('phone');

    return {
      isValid: isFioValid && isEmailValid && isPhoneValid,
      errorFields
    };
  };

  /**
   * Handles from submit
   * @param {Object} event - submit event
   * @return {undefined}
   */
  const submit = event => {
    _fromElem['fio'].className = '';
    _fromElem['email'].className = '';
    _fromElem['phone'].className = '';

    const {
      isValid,
      errorFields
    } = validate();

    if (isValid) {
      _fromElem.elements.submitButton.disabled = true;

      setData({
        'fio': '',
        'email': '',
        'phone': ''
      });

      // XHR запросы нельзя выполнять по протоколу file:///
      // Можно поднять локальный сервер для решения задачи,
      // но я решил сделать эмуляцию общения с сервером.

      _simulateRequest().then(_handleResponse);

    } else {
      errorFields.forEach(errorField => {
        _fromElem[errorField].className = 'ya-input__error';
      });
    }

    event.preventDefault();
  }

  /**
   * Validates FIO field
   * @param {string} value - FIO field value
   * @return {Boolean} - validation result
   */
  const _validateFio = value => value && value.trim().split(' ').length === 3;

  /**
   * Validates Email field
   * @param {string} value - email field value
   * @return {Boolean} - validation result
   */
  const _validateEmail = value => {
    const emailRegExp = /^[a-z0-9]+\.[a-z0-9]+@yandex\.(ru|ua|kz|by|com)|ya\.ru/;

    return value && emailRegExp.test(value);
  };

  /**
   * Validates phone field
   * @param {string} value - phone field value
   * @return {Boolean} - validation result 
   */
  const _validatePhone = value => {
    const phoneRegExp = /^(\+7)\(\d{3}\)\d{3}\-\d{2}\-\d{2}/;

    return value && phoneRegExp.test(value) && _stringSum(value) < 30;
  };

  const _simulateRequest = () => {
    return new Promise(resolve => {
      // hiccup 250-500 milliseconds
      const hiccup = Math.floor(Math.random() * (500 - 250) + 250);

      setTimeout(() => resolve(_mockedResponse), hiccup);
    });
  };

  const _handleResponse = response => {
    _resultContainer.className = '';
    _resultContainer.innerHTML = '';

    switch (response.status) {
      case 'success':
        _resultContainer.className = 'success';
        _resultContainer.innerHTML = 'Success';
        break;
      case 'error':
        _resultContainer.className = 'error';
        _resultContainer.innerHTML = response.reason;
        break;
      case 'progress':
        _resultContainer.className = 'progress';
        _resultContainer.innerHTML = 'Progress...';

        setInterval(() => {
          _simulateRequest().then(_handleResponse);
        }, response.timeout);
        break;
    }
  };

  /**
   * Sums integers in a strings
   * @param {string} string - string with numbers to be summed
   * @return {Number} - sum of the string's numbers
   */
  const _stringSum = string => {
    const int = x => {
      const number = parseInt(x, 10);

      if (!isNaN(number)) {
        return number;
      }
    }
    const notUndefined = n => n != undefined;
    const sum = (a, b) => a + b;

    return string.split('').map(int).filter(notUndefined).reduce(sum);
  };

  return {
    getData,
    setData,
    validate,
    submit,
    init
  }
}());

MyForm.init();