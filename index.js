const MyForm = (function () {
  let mockedResponse = success;

  const getData = () => {
    const formElem = document.getElementById('myForm');

    return {
      'fio': formElem['fio'].value,
      'email': formElem['email'].value,
      'phone': formElem['phone'].value
    }
  };

  const setData = ({
    fio,
    email,
    phone
  }) => {
    const formElem = document.getElementById('myForm');

    formElem['fio'].value = fio;
    formElem['email'].value = email;
    formElem['phone'].value = phone;
  };

  const validate = formData => {
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
    }
  };

  const submit = event => {
    event.preventDefault();

    const formElem = event.target;

    formElem['fio'].className = '';
    formElem['email'].className = '';
    formElem['phone'].className = '';

    const formData = getData();
    const {
      isValid,
      errorFields
    } = validate(formData);

    if (isValid) {
      // XHR запросы нельзя выполнять локально по протоколу file:///
      // Поэтому результат берется из глобальных объектов
      _processResponse(mockedResponse);

      setData({
        'fio': '',
        'email': '',
        'phone': ''
      });
    } else {
      errorFields.forEach(error => {
        formElem[error].className = 'ya-input__error';
      });
    }
  }

  const _validateFio = value => {
    return false;
  };

  const _validateEmail = value => {
    return true;
  };

  const _validatePhone = value => {
    const phoneRegExp = /^(\+7)\(\d{3}\)\d{3}-\d{2}-\d{2}/;

    return value && phoneRegExp.test(value) && _stringSum(value) > 30;
  };

  const _processResponse = response => {
    const resultContainer = document.getElementById('resultContainer');

    resultContainer.className = '';

    switch (response.status) {
      case 'success':
        resultContainer.className = 'success';
        break;
      case 'error':
        resultContainer.className = 'error';
        break;
      case 'progress':
        resultContainer.className = 'progress';
        break;
    }
  };

  const _stringSum = string => {
    const int = x => {
      const number = parseInt(x, 10);

      if (!isNaN(number)) {
        return number;
      }
    }

    return string.split('').map(int).reduce((a, b) => {
      return a + b;
    });
  };

  return {
    getData,
    setData,
    validate,
    submit
  }
}());

const formElem = document.getElementById('myForm');
formElem.addEventListener('submit', MyForm.submit);