/* eslint-disable no-unused-vars */
'use strict';

let productName =
  ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg'
    , 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'water-can.jpg', 'wine-glass.jpg'];

let threeImages = document.getElementById('threeImg');
let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');
let results = document.getElementById('results');
let buttonResult = document.getElementById('button');

ProductChoice.all = [];
let counter = 25;

//constructor
function ProductChoice(name) {
  this.name = name.split('.')[0];
  this.view = 0;
  this.click = 0;
  this.path = `./assets/${name}`;
  ProductChoice.all.push(this);



}

// function handleSubmit(event){
//   event.preventDefault();
//   event.

//render

let left_Image;
let center_Image;
let right_Image;

function renderImages(left_Image, center_Image, right_Image) {
  console.log(right_Image.path, 'img');
  rightImage.setAttribute('src', right_Image.path);
  rightImage.setAttribute('alt', right_Image.name);
  rightImage.setAttribute('title', right_Image.name);
  right_Image.view++;
  centerImage.setAttribute('src', center_Image.path);
  centerImage.setAttribute('alt', center_Image.name);
  centerImage.setAttribute('title', center_Image.name);
  center_Image.view++;
  leftImage.setAttribute('src', left_Image.path);
  leftImage.setAttribute('alt', left_Image.name);
  leftImage.setAttribute('title', left_Image.name);
  left_Image.view++;
}

let noRepeat = [];

function render() {
  left_Image = ProductChoice.all[getRndInteger(0, ProductChoice.all.length - 1)];
  center_Image = ProductChoice.all[getRndInteger(0, ProductChoice.all.length - 1)];
  right_Image = ProductChoice.all[getRndInteger(0, ProductChoice.all.length - 1)];


  while(left_Image === center_Image || left_Image === right_Image || right_Image === center_Image || noRepeat.includes(left_Image) || noRepeat.includes(center_Image) || noRepeat.includes(right_Image)){
    left_Image = ProductChoice.all[getRndInteger(0, ProductChoice.all.length - 1)];
    center_Image = ProductChoice.all[getRndInteger(0, ProductChoice.all.length - 1)];
    right_Image = ProductChoice.all[getRndInteger(0, ProductChoice.all.length - 1)];
  }

  noRepeat= [];
  noRepeat.push(left_Image);
  noRepeat.push(center_Image);
  noRepeat.push(right_Image);

  renderImages(left_Image, center_Image, right_Image);


}



for (let i = 0; i < productName.length; i++) {
  new ProductChoice(productName[i]);
}
render();



threeImages.addEventListener('click', clickReact);

function clickReact(event) {
  if (event.target.id === 'leftImage' || event.target.id === 'centerImage' || event.target.id === 'rightImage') {
    render();
    counter--;
  }

  if (event.target.id === 'leftImage') {
    left_Image.click++;
  }
  if (event.target.id === 'centerImage') {
    center_Image.click++;
  }
  if (event.target.id === 'rightImage') {
    right_Image.click++;
  }

  if (counter === 0) {
    threeImages.removeEventListener('click', clickReact);
    getResults();
    savedToLocalStorage();
  }

}



// create chart

function createChart() {
  let context = document.getElementById('myChart').getContext('2d');

  let productName = [];
  let click = [];
  for (let i = 0; i < ProductChoice.all.length; i++) {
    productName.push(ProductChoice.all[i].name);
  }

  for (let i = 0; i < ProductChoice.all.length; i++) {
    click.push(ProductChoice.all[i].click);
  }

  let chartObject = {
    type: 'bar',
    data: {
      labels: productName,
      datasets: [{
        label: ' voting results',
        backgroundColor: 'rgb(230, 110, 40)',
        borderColor: 'black',
        pointBackgroundColor: 'rgba(220,220,220,1)',
        data: click,
        borderWidth: 1 ,

      }]
    },
    options: {
      legend: {
        labels: {
          fontColor: 'orange',
          size:16,
          weight:'bold',

        }
      },
      title: {
        display: true,
        fontColor: 'blue',

      } ,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true,
            fontColor: 'red',
            weight:'bold',

          },
        }],
        xAxes: [{
          ticks: {
            fontColor: 'green',
            size:20,
            weight:'bold',
          },
        }]
      }

    }
  };
  // eslint-disable-next-line no-undef
  let myChart = new Chart(context, chartObject);
}

function getResults() {
  createChart();

  let ul = document.createElement('ul');
  results.appendChild(ul);
  for (let i = 0; i < ProductChoice.all.length; i++) {
    let li = document.createElement('li');
    ul.appendChild(li);
    li.textContent = ProductChoice.all[i].name + ' was viewed ' + ProductChoice.all[i].view + ' times & had ' + ProductChoice.all[i].click + ' clicks';

  }
}

function savedToLocalStorage(){
  localStorage.setItem('productName', JSON.stringify(ProductChoice.all));

}

function getData(){
  let getInfo = localStorage.getItem('productName');

  if (getInfo !== null){
    ProductChoice.all= JSON.parse(getInfo);
    getResults();
    createChart();
  }
}
getData();

// threeImages.addEventListener('click', savedToLocalStorage);




// for (let i=0 ; i<ProductChoice.all.length;i++){
//   if (ProductChoice.all[i].name === event.target.title){
//     ProductChoice.all[i].click++;
//   }
// }






// productName.push(
//   new ProductChoice('bag', 'jpg'),
//   new ProductChoice('banana', 'jpg'),
//   new ProductChoice('bathroom', 'jpg'),
//   new ProductChoice('boots', 'jpg'),
//   new ProductChoice('breakfast', 'jpg'),
//   new ProductChoice('bubblegum', 'jpg'),
//   new ProductChoice('chair', 'jpg'),
//   new ProductChoice('cthulhu', 'jpg'),
//   new ProductChoice('dog-duck', 'jpg'),
//   new ProductChoice('dragon', 'jpg'),
//   new ProductChoice('pen', 'jpg'),
//   new ProductChoice('pet-sweep', 'jpg'),
//   new ProductChoice('scissors', 'jpg'),
//   new ProductChoice('shark', 'jpg'),
//   new ProductChoice('sweep', 'png'),
//   new ProductChoice('tauntaun', 'jpg'),
//   new ProductChoice('unicorn', 'jpg'),
//   new ProductChoice('usb', 'gif'),
//   new ProductChoice('water-can', 'jpg'),
//   new ProductChoice('wine-glass', 'jpg')
// );

//   const leftImage=randomNumber(0,ProductChoice.all.length);
//   let randomLeftImage=ProductChoice.all[leftImage];
//   leftImage.src=randomLeftImage.path;
//   leftImage.title=randomLeftImage.name;
//   leftImage.alt=randomLeftImage.name;

//   const centerImage=randomNumber(0,ProductChoice.all.length);
//   let randomCenterImage=ProductChoie.all[centerImage];
//   centerImage.src=randomCenterImage.path;
//   centerImage.title=randomCenterImage.name;
//   centerImage.alt=randomCenterImage.name;

//   const rightImage=randomNumber(0,ProductChoice.all.length);
//   let randomRightImage=ProductChoice.all[rightImage];
//   rightImage.src=randomRightImage.path;
//   rightImage.title=randomRightImage.name;
//   rightImage.alt=randomRightImage.name;






function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
