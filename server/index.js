const express = require('express')
const app= express()
const fs = require('fs');
const cors =require('cors');
//const { request } = require('http');
const path = require('path');
//const { request } = require('http');
//const port = process.env.PORT || 3001;
// Load data from JSON file into memory
const rawData = fs.readFileSync("sampledata.json")
const data = JSON.parse(rawData)
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '..','client', 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });
app.get('/products',(request,response)=>{
    response.json(data.products)
})

app.get('/users',(request,response)=>{
    response.json(data.users)
})
// });
// app.get('/session',(request,response)=> {
//     fs.readFile('./server/sampledata.json', (err, data) => {
//         if (err) throw err;
//         let sampledata = JSON.parse(data);
//         response.json(sampledata.session)
//     });
app.get('/session',(req,res)=>{
    res.json(data.session)
})

app.get('/products/:id', (req, res) => {
    // Assuming 'data' is an array of products
    const productId = req.params.id;
  
    // Use find method to search for the product with a matching ID
    const product = data.products.find((product) => {
      return product.id === productId;
    });
  
    if (product) {
      // Respond with JSON if the product is found
      res.json(product);
    } else {
      // Respond with an error message if the product is not found
      res.status(404).send("Product not found");
    }
  });

app.get('/users/:id', (req, res) => {
  const userID = parseInt(req.params.id);
  const user = data.users.find((user) => {
    return user.id === userID;
  });

  if (user) {
    // Respond with JSON if the product is found
    res.json(user);
  } else {
    // Respond with an error message if the product is not found
    res.status(404).send("User not found");
  }
});
app.get('/orders', (request, response) => {
  const userId = parseInt(request.query.user_id); // Use request.query to access query parameters

  // Ensure userId is a valid number
  if (isNaN(userId)) {
      response.status(400).json({ error: 'Invalid user_id parameter' });
      return;
  }

  const orders = data.orders.filter((order) => {
      return order.user_id === userId;
  });

  if (orders.length > 0) {
      response.json(orders);
  } else {
      response.status(404).json({ error: 'No orders found for the user' });
  }
});


// GET /categories - get the product category names and a user friendly name for them
app.get('/categories',(request,response)=> {
    response.json(data.categories)

});
// // GET /tags - get an array of all tag names used for products
app.get('/tags',(request,response)=>{
  response.json(data.tags)
})

// });
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})