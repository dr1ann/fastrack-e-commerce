const ejs = require('ejs');
const { readFileSync, writeFileSync, mkdirSync } = require('fs');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');

// Initialize Firebase app
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
const app = initializeApp(firebaseConfig);

// Get reference to Categories node in Firebase
const catRef = ref(getDatabase(app), 'Categories/');

// Read in the EJS template for the category pages
const template = readFileSync('category.ejs', 'utf8');

// Generate a page for each category
onValue(catRef, (snapshot) => {
  

  
    snapshot.forEach((childSnapshot) => {
        const categories = childSnapshot.val();
        const items = categories.Items;
        const hasItems = items ;
     
          
           
          
        const categoryData = {
            categoryName: categories.Category_Name,
            items: hasItems ? Object.entries(items).map(([itemId, item]) => ({...item, itemId})) : null,
            noItemsMessage: hasItems ? null : "No items available",
            
          
        };
        if (hasItems) {
            categoryData.items.forEach((item, index) => {
                item.itemId = item.itemId || Object.keys(items).find(key => items[key].Product_Name === item.Product_Name);
              });
}
        const pageHtml = ejs.render(template, categoryData);
        writeFileSync(`${categories.Category_Name}.html`, pageHtml);
       
    
    });
});