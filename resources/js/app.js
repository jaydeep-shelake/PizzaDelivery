//client side javascript
import axios from 'axios';
import Noty from 'noty';

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

const addComment = document.getElementById('addComment');
const modalArea = document.getElementById('modalArea');
addComment.addEventListener('click',()=>{
modalArea.classList.add('show');
});

window.addEventListener('click',(e)=>{
  if(e.target.classList.contains('modal-con')){
    modalArea.classList.remove('show')
  }
})