const express = require('express')
const app= express()
const fs = require('fs');
const cors =require('cors')
app.use(express.json())
app.use(
    cors({
        origin:"http://localhost:3000",
    })
);

app.get('/products',(request,response)=> {
    fs.readFile('./server/sampledata.json', (err, data) => {
        if (err) throw err;
        let sampledata = JSON.parse(data);
        response.json(sampledata.products)
    });
    console.log('This is anpfter the read call');
    console.log("products")

});
// get user 
app.get('/users',(request,response)=> {
    fs.readFile('./server/sampledata.json', (err, data) => {
        if (err) throw err;
        let sampledata = JSON.parse(data);
        response.json(sampledata.users)
    });
    console.log('This is anpfter the read call');
    console.log("users")

});
app.get('/session',(request,response)=> {
    fs.readFile('./server/sampledata.json', (err, data) => {
        if (err) throw err;
        let sampledata = JSON.parse(data);
        response.json(sampledata.session)
    });

});
app.get('/products/:id', (resquest, response)=>{
    fs.readFile('./server/sampledata.json',(err,data)=>{
        if(err) throw err; 
        let sampledata =JSON.parse(data);
        let productID= sampledata.products.find((product) =>  {
            return product.id === resquest.params.id;
        });
        response.json(productID);
    });
});
app.get('/users/:id', (request, response)=>{
    fs.readFile('./server/sampledata.json',(err,data)=>{
        if(err) throw err; 
        let sampledata =JSON.parse(data);
        let userID= sampledata.users.find((user) =>  {
            return user.id === parseInt(request.params.id);
        });
        response.json(userID);
    });
});

app.get('/orders', (request, response) => {
    const userId = parseInt(request.query.user_id); // Use request.query to access query parameters

    // Ensure userId is a valid number
    if (isNaN(userId)) {
        response.status(400).json({ error: 'Invalid user_id parameter' });
        return;
    }

    fs.readFile('./server/sampledata.json', (err, data) => {
        if (err) {
            response.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        const sampledata = JSON.parse(data);

        const orders = sampledata.orders.filter((order) => {
            return order.user_id === userId;
        });

        response.json(orders);
    });
});

// GET /categories - get the product category names and a user friendly name for them
app.get('/categories',(request,response)=> {
    fs.readFile('./server/sampledata.json', (err, data) => {
        if (err) throw err;
        let sampledata = JSON.parse(data);
        response.json(sampledata.categories)
    });
    console.log('This is anpfter the read call');
    console.log("categories")

});
// GET /tags - get an array of all tag names used for products
app.get('/tags',(request,response)=> {
    fs.readFile('./server/sampledata.json', (err, data) => {
        if (err) throw err;
        let sampledata = JSON.parse(data);
        response.json(sampledata.tags)
    });
    console.log('This is anpfter the read call');
    console.log("tags")

});
//POST /orders - create a new order

 
app.post('/orders', (request, response) => {
    // Read the existing data from the JSON file
    fs.readFile('./server/sampledata.json', (err, data) => {
      if (err) {
        console.error('Error reading JSON file:', err);
        response.status(500).json({ error: 'Internal server error' });
        return;
      }
  
      try {
        // Parse the existing data
        const sampledata = JSON.parse(data);
  
        // Generate a new order ID (assuming an auto-incremented ID)
        const newOrderId = generateNewOrderId(sampledata.orders);
  
        // Create a new order with the request body and the new ID
        const newOrder = {
          ...request.body,
          id: newOrderId,
        };
  
        // Update the sampledata with the new order
        const newdata = {
          ...sampledata,
          orders: [...sampledata.orders, newOrder],
        };
  
        // Write the updated data back to the JSON file
        fs.writeFileSync('./server/sampledata.json', JSON.stringify(newdata));
  
        // Respond with a success message
        response.json({ ok: 1 });
      } catch (error) {
        console.error('Error parsing or writing JSON:', error);
        response.status(500).json({ error: 'Internal server error' });
      }
    });
  });
  
  // Function to generate a new order ID
  function generateNewOrderId(orders) {
    // Find the maximum existing order ID
    const maxOrderId = orders.reduce((maxId, order) => {
      return Math.max(maxId, order.id || 0);
    }, 0);
  
    // Generate a new ID by incrementing the maximum existing ID
    return maxOrderId + 1;
  }
  
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running ${PORT}` );
});