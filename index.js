const MyForm = (function () {
  const getData = () => {

  };

  const setData = () => {

  };

  const validate = () => {

  };

  const submit = (e) => {
    e.preventDefault();
    console.log('done');
  };

  return {
    getData,
    setData,
    validate,
    submit
  }
}());

const myForm = document.querySelector('#myForm');
myForm.addEventListener('submit', MyForm.submit);