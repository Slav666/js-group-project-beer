const PubSub = require('../helpers/pub_sub.js');

const EditView = function(divContainer, editForm) {
  this.container = divContainer;
  this.form = editForm;
  this.beer = null;
};


EditView.prototype.bindEvents = function () {
  PubSub.subscribe('BeerView:update-button-clicked', (evt) => {
    this.container.style.display = "block";
    this.beer = evt.detail;
    this.populateEditBox();
  })
  this.form.addEventListener('submit', (evt) => {
    this.handleSubmit(evt);
  })
};

EditView.prototype.populateEditBox = function () {

    this.form.name.value = this.beer.name;
    this.form.brewery.value = this.beer.brewery;

    const countrySelect = document.querySelector('#edit-countries')
    countrySelect.options.forEach((option) =>{
      
    })
    this.form.countries.value = this.beer.country;


    this.form.abv.value = this.beer.abv;
    this.form.type.value = this.beer.type;
    this.form.description.value = this.beer.description;
    this.form.rating.value = this.beer.rating
};

EditView.prototype.handleSubmit = function (evt) {
  evt.preventDefault();
  const updatedBeerInput = this.createUpdatedBeer(evt.target);
  this.container.style.display = "none";
  PubSub.publish('EditView:updated-beer-submit', updatedBeerInput);
};

EditView.prototype.createUpdatedBeer = function () {
  debugger;
  const updatedBeer = {
    id: this.beer._id,
    name: this.form.name.value,
    brewery: this.form.brewery.value,
    country: this.form.country.value,
    abv: this.form.abv.value,
    type: this.form.type.value,
    description: this.form.description.value,
    rating: this.form.rating.value
  };
  return updatedBeer;
};



module.exports = EditView;
