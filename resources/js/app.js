//client side javascript
import axios from 'axios';
import Noty from 'noty';
import initAdmin from './admin';
import moment from 'moment';
const addToCartBtn = document.querySelectorAll('.btn-cart');
const cartCounterDisplay = document.getElementById('cart-counter');
addToCartBtn.forEach(btn=>{
btn.addEventListener('click',(e)=>{
 let pizza = JSON.parse(btn.dataset.pizza); // converting pizza data from string to valid object
 updateCart(pizza);
 console.log(pizza); 
});
});

function updateCart(pizza){
  axios.post('/update-cart',pizza)
  .then(res=>{
    console.log(res);
    cartCounterDisplay.innerText= res.data.totalQty;
    // giving massage after adding to cart
     new Noty({
       text:'Pizza added to cart successfully',
       type:'success',
       timeout:1000,
       progressBar:false,
     }).show();
  }).catch(err=>{
    new Noty({
      text:' Sorry! something went wrong we cloud not add your pizza to cart',
      type:'error',
      timeout:1000,
      progressBar:false,
    }).show();
  })
}

initAdmin();

// const addComment = document.getElementById('addComment');
// const modalArea = document.getElementById('modalArea');
// addComment.addEventListener('click',()=>{
// modalArea.classList.add('show');
// });

window.addEventListener('click',(e)=>{
  if(e.target.classList.contains('modal-con')){
    modalArea.classList.remove('show')
  }
});

const successAlert = document.getElementById('succes-alert');
if(successAlert){
  setTimeout(()=>{
   successAlert.remove();
  },3000)
}

//chage order status
let statuses = document.querySelectorAll('.status_line');
const hiddenInput =document.getElementById('hiddenInput')
let order = hiddenInput ? hiddenInput.value:null;
order=JSON.parse(order);
let time = document.createElement('small');

function updateStatus(order){
  statuses.forEach((status,index)=>{
    status.classList.remove('step-completed');
    status.classList.remove('current')
  });
let stepCompleted = true;
statuses.forEach((status,index)=>{
  const dataStatus=status.dataset.status;
  if(stepCompleted){
    status.classList.add('step-completed');
  }
  if(dataStatus==order.status){
    stepCompleted=false;
    time.innerText=moment(order.updatedAt).format('MMMM Do YYYY,h:mm:ss A');
    status.appendChild(time)
    if(status.nextElementSibling){
      status.nextElementSibling.classList.add('current-status');
    }
    
  }
  
});
}

updateStatus(order);

//socket
const socket = io();
if(order){
  socket.emit('join',`order_${order._id}`);
}
let adminAreaPath = window.location.pathname;
if(adminAreaPath.includes('admin')){
socket.emit('join','adminRoom');
}
socket.on('orderUpdated',(data)=>{
const updatedOrder = {...order};
updatedOrder.updatedAt=moment().format();
updatedOrder.status = data.status;
console.log(updatedOrder);
updateStatus(updatedOrder);
console.log(`data: ${data}`);
new Noty({
  text:'Order updated',
  type:'success',
  timeout:1000,
  progressBar:false,
}).show();
});
