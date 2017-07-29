const MyForm = {
  getData() {

  },

  setData() {

  },

  validate() {
    
  },

  submit(e) {
    e.preventDefault();
    console.log('done');
  }
}

const myForm = document.querySelector('#myForm');
myForm.addEventListener('submit', MyForm.submit);