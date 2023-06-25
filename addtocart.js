
  
  // Import the functions you need from the SDKs you need
 // Import the functions you need from the SDKs you need

 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword,  signOut, updateProfile, sendSignInLinkToEmail, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
  import { getDatabase, set, ref, update, onValue } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCtisSJKA9OIYxI3B9tbtWEGg0PKiI0Vks",
    authDomain: "loginpage-fa237.firebaseapp.com",
    databaseURL: "https://loginpage-fa237-default-rtdb.firebaseio.com",
    projectId: "loginpage-fa237",
    storageBucket: "loginpage-fa237.appspot.com",
    messagingSenderId: "709059025327",
    appId: "1:709059025327:web:a45e1c21fc088473fd375a",
    measurementId: "G-3664V8SZKB"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  const database = getDatabase();
  
  AOS.init({
  duration: 1500,
})
const accounts = document.getElementById('acc');

 accounts.addEventListener('click', function(e) {
    onAuthStateChanged(auth, (user) => {
e.preventDefault();
const sellerInfo = ref(database, 'Seller/' + 'Pending_Request/' + user.uid  );

onValue(sellerInfo, (snapshot) => {
  const data = snapshot.val();
  console.log(data)
  if(data === null) {
    window.location = 'accifLoggedIn.html'
  } else {
    window.location = 'SellerAccount.html'
  }

    })
    })
 })
console.log(auth);
function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}


let productsInCart;
function getUid() { 
onAuthStateChanged(auth, (user) => {
      if (user) {
         productsInCart =  JSON.parse(localStorage.getItem(`cart-${user.uid}`));
      }
    })
}
getUid();
// Get the UID of the user
// let productsInCart = JSON.parse(localStorage.getItem(`uid`));

// Retrieve the items for the user with the given UID



if(!productsInCart){
	productsInCart = [];
   
} 

const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#sum-prices');
const products = document.querySelectorAll('.product-under');

const countTheSumPrice = function () { // 4
	let sum = 0;
	productsInCart.forEach(item => {
		sum += item.price;
	});
	return sum;
   
}

window.onload = function() {
   

          // Get the item from local storage
          onAuthStateChanged(auth, (user) => {
            let currentUser = user.uid
            let cartRef = ref(database, `users/User Info/${currentUser}/Cart/`);
            onValue(cartRef, (snapshot1) => {
  const waw = snapshot1.val();
console.log(waw.total_price)
console.log(cartRef)
if(user == null) {
    window.location = "index.html";
}

            else if( waw.total_price !== "₱0" && waw !== "empty" ) {

                   
                let output = '';


  output = waw.productsInCart.map((items) => `
    <li class="buyItem">
      <img src="${items.image}">
      <div>
        <h5>${items.name}</h5>
        <h6>₱${items.price.toLocaleString()}</h6>
        <div>
          <button class="button-minus" data-id=${items.id}>-</button>
          <span class="countOfProduct">${items.count}</span>
          <button class="button-plus" data-id=${items.id}>+</button>
        </div>
      </div>
    </li>`).join('');

  // Update the DOM with the final output string
 
  document.querySelector('#buyItems').innerHTML = output;
  document.querySelector('.checkout').classList.remove('hidden');
  document.querySelector('#pri').innerHTML =`Total Price:`
  cartSumPrice.innerHTML = waw.total_price;
  

  


            }  
            
            
            else {
                document.querySelector('.checkout').classList.add('hidden');
        document.querySelector('#pri').classList.add('hide');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
            }
        

        //   var item = JSON.stringify(localStorage.getItem(`cart-${user.uid}`));
          // Display the item on the page
        });
        
    } 
        )}
      
    
    

    
const updateShoppingCartHTML = function () {  // 3
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        localStorage.setItem(`cart-${user.uid}`, JSON.stringify(productsInCart));
      } 
    });
  
    // The user object is available here
    
    
  
	if (productsInCart.length > 0) {

		let result = productsInCart.map(product => {
			return `
				<li class="buyItem">
					<img src="${product.image}">
					<div>
						<h5>${product.name}</h5>
						<h6>₱${product.price.toLocaleString()}</h6>
						<div>
							<button class="button-minus" data-id=${product.id}>-</button>
							<span class="countOfProduct">${product.count}</span>
							<button class="button-plus" data-id=${product.id}>+</button>
						</div>
					</div>
				</li>`
                

		});
		parentElement.innerHTML = result.join('');
		document.querySelector('.checkout').classList.remove('hidden');
        document.querySelector('#pri').classList.remove('hide');
		cartSumPrice.innerHTML = '₱' + countTheSumPrice().toLocaleString();
       
	}
	else {
		document.querySelector('.checkout').classList.add('hidden');
        document.querySelector('#pri').classList.add('hide');
		parentElement.innerHTML = '<h4 class="empty">Your shopping cart is empty</h4>';
		cartSumPrice.innerHTML = '';
	}
}

function updateProductsInCart(product) { // 2
	for (let i = 0; i < productsInCart.length; i++) {
		if (productsInCart[i].id == product.id) {
			productsInCart[i].count += 1;
			productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
			return;
		}
	}
	productsInCart.push(product);
}

products.forEach(item => {   // 1
	item.addEventListener('click', (e) => {
        
        if (e.target.classList.contains('addToCart')) {
            myFunction();
			const productID = e.target.dataset.productId;
			const productName = item.querySelector('.productName').innerHTML;
			const productPrice = item.querySelector('.priceValue').innerHTML;
            var numericPrice = Number(productPrice.replace(/,/g, ""));
			const productImage = item.querySelector('img').src;
			let product = {
				name: productName,
				image: productImage,
				id: productID,
				count: 1,
				price: +numericPrice,
				basePrice: +numericPrice,
			}
            
            

// Check if the user is signed in





            onAuthStateChanged(auth, (user) => {
  if (user) {
    var currentUser = user.uid;
    
   
    update(ref(database, 'users/'  + "User Info/" +  currentUser)
    , {
                
                Cart: { productsInCart,  total_price:  '₱' + countTheSumPrice().toLocaleString() }
            })
   
  } 
});
         
        
    
           
			updateProductsInCart(product);
			 updateShoppingCartHTML();

             
             
}
    
	});
});

parentElement.addEventListener('click', (e) => { // Last
    e.preventDefault();
	const isPlusButton = e.target.classList.contains('button-plus');
	const isMinusButton = e.target.classList.contains('button-minus');
	if (isPlusButton || isMinusButton) {
		for (let i = 0; i < productsInCart.length; i++) {
			if (productsInCart[i].id == e.target.dataset.id) {
				if (isPlusButton) {
					productsInCart[i].count += 1
				}
				else if (isMinusButton) {
					productsInCart[i].count -= 1
				}
				productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;

			}
			if (productsInCart[i].count <= 0) {
				productsInCart.splice(i, 1);
			}
		}
        onAuthStateChanged(auth, (user) => {
  if (user) {
    var currentUser = user.uid;
    
    
    update(ref(database, 'users/'  + "User Info/" +  currentUser), {
                
                Cart: { productsInCart,  total_price:  '₱' + countTheSumPrice().toLocaleString() }
            })
   
  } 
});
        updateShoppingCartHTML();
	
updateShoppingCartHTML();
    }
});