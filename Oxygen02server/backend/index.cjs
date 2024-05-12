const Main = require('./main').Main;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const { configurePassport } = require('./passport/passport.cjs');

const app = express();
const port = 3000;
const mongoURI = 'mongodb+srv://KamuliMoses:Flower1@cluster0.vndkrkl.mongodb.net/Oxygen02_DB?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    // Start the server after the database connection is established
    app.listen(port, () => {
      console.log('Server is listening on port ' + port);
    });
  })
  .catch(error => {
    console.error('Database connection failed:', error);
    process.exit(1); // Exit the process if database connection fails
  });

// CORS options
const whitelist = ['*', 'http://localhost:4200'];
const corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || whitelist.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS.'));
    }
  },
  credentials: true
};

// Express middleware setup
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({ secret: 'testsecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configure Passport
configurePassport(passport);

// Routes
app.use('/app/users', userRoutes);
app.use('/app/products', productRoutes);
app.use('/app/orders', orderRoutes);
app.use('/app/carts', cartRoutes);

// Protected route 
app.get('/app/protected-route', isAuthenticated, (req, res) => {
  res.json({ message: 'This route is protected' });
});

// Admin route to add a new product
app.post('/app/add-product', isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Logic to add a new product
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route accessible only to registered users 
app.get('/app/user-profile', isAuthenticated, (req, res) => {
  // Logic to return user profile information
});

// Route accessible only to admins for managing products (/app/manage-products)
app.post('/app/manage-products', isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Logic to manage products
  } catch (error) {
    console.error('Error managing products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

// Middleware to check if user is an admin
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next();
  } else {
    return res.status(403).json({ message: 'Forbidden' }); 
  }
}

/*const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');
const passport = require('passport');


const app = express();
const port = 3000;
const mongoURI = 'mongodb+srv://KamuliMoses:Flower1@cluster0.vndkrkl.mongodb.net/Oxygen02_DB?retryWrites=true&w=majority&appName=Cluster0';

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database Connection is ready...');
    // Assuming 'app' is defined earlier in your code
    app.listen(port, () => {
      console.log("Hello Oxygen02_Eshopper!");
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });


//frontendconnection
const whitelist = ['*', 'http://localhost:4200'];
const corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || whitelist.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    credentials: true
};

// Use CORS middleware
app.use(cors(corsOptions));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies
app.use(express.json());

// Use Passport middleware
//app.use(initialize());

app.use(passport.initialize());


// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); // User is authenticated, proceed to next middleware
  } else {
    return res.status(401).json({ message: 'Unauthorized' }); // User is not authenticated, send 401 Unauthorized response
  }
}

// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next(); // User is an admin, proceed to next middleware
  } else {
    return res.status(403).json({ message: 'Forbidden' }); 
  }
};

// Routes
app.use('/app/users', userRoutes);
app.use('/app/products', productRoutes);
app.use('/app/orders', orderRoutes);
app.use('/app/carts', cartRoutes);

// Protected route 
app.get('/app/protected-route', isAuthenticated, (req, res) => {
  res.json({ message: 'This route is protected' });
});

// Admin route to add a new product
app.post('/app/add-product', isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Parse product information from request body
    const { name, price, description } = req.body;

    // Validate product information (you can add more validation as per your requirements)
    if (!name || !price || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
      description,
    });

    // Save the new product to the database
    await newProduct.save();

    // Return success response
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    // Handle any errors
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route accessible only to registered users 
app.get('/app/user-profile', isAuthenticated, (req, res) => {
  // Return user profile information
  res.json({ user: req.user });
});

// Route accessible only to admins for managing products (/api/manage-products)
app.post('/app/manage-products', isAuthenticated, isAdmin, async (req, res) => {
  try {
    // Parse action type and product information from request body
    const { action, product } = req.body;

    // Check if action type is provided
    if (!action) {
      return res.status(400).json({ message: 'Action type is required' });
    }

    // Perform corresponding operation based on action type
    switch (action) {
      case 'add':
        // Logic to add a new product
        const newProduct = new product(product);
        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully', product: newProduct });
        break;
      case 'update':
        // Logic to update a product
        if (!product || !product._id) {
          return res.status(400).json({ message: 'Product ID is required for update' });
        }
        await product.findByIdAndUpdate(product._id, product);
        res.json({ message: 'Product updated successfully' });
        break;
      case 'delete':
        // Logic to delete a product
        if (!product || !product._id) {
          return res.status(400).json({ message: 'Product ID is required for deletion' });
        }
        await product.findByIdAndDelete(product._id);
        res.json({ message: 'Product deleted successfully' });
        break;
      default:
        res.status(400).json({ message: 'Invalid action type' });
    }
  } catch (error) {
    // Handle any errors
    console.error('Error managing products:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route accessible only to customers for managing their orders (/api/manage-orders)
app.get('/app/manage-orders', isAuthenticated, (req, res) => {
  // Logic to manage orders (e.g., view order history)
});*/