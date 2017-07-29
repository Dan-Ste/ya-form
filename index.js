const MyForm = (function () {
  let mockedResponse = success;

  const getData = () => {

  };

  const setData = () => {

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
    const formData = {
      'fio': formElem['fio'].value,
      'email': formElem['email'].value,
      'phone': formElem['phone'].value
    }
    const {
      isValid,
      errorFields
    } = validate(formData);

    if (isValid) {
      // XHR запросы нельзя выполнять локально по протоколу file:///
      // Поэтому результат берется из глобальных объектов
      _processResponse(mockedResponse)
    } else {
      errorFields.forEach(error => {
        document.querySelector(`[name='${error}'`).className = 'ya-input__error';
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
    return true;
  };

  const _processResponse = response => {
    const resultContainer = document.getElementById('resultContainer');

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

  return {
    getData,
    setData,
    validate,
    submit
  }
}());

const formElem = document.getElementById('myForm');
formElem.addEventListener('submit', MyForm.submit);