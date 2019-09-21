class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = this.createBaseUrl(baseUrl);
  }

  createBaseUrl(url) {
    return axios.create({
      baseURL: url
    });
  }

  getFullList() {
    this.BASE_URL.get("/characters/")
      .then(response => {
        console.log('get successful and the response is: ', response);
      })
      .catch(error => {
        console.log('Oh No! Error is: ', error);
      })
  }

  getOneRegister(id) {
    return this.BASE_URL.get(`/characters/${id}`);
  }

  createOneRegister(characterInfo) {
    return this.BASE_URL.post('/characters', characterInfo);

  }

  updateOneRegister() {

  }

  deleteOneRegister() {

  }
}