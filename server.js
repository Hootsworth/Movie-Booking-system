const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'movie_booking_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 } // 1 hour
}));

// Routes for API
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/booking', require('./routes/booking'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/theatres', require('./routes/theatres'));
app.use('/api/screens', require('./routes/screens'));
app.use('/api/showtimes', require('./routes/showtimes'));


  


//main part kinda 
app.use(express.static(path.join(__dirname, 'views')));
// Serve the login page as the default page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));  // Serve the login page
});

// Serve other frontend HTML pages with unique routes
app.get('/user-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'user-dashboard.html'));
});

app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'));
});

app.get('/add-movie', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-movie.html'));
});

app.get('/add-showtime', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-showtime.html'));
});

app.get('/add-theatre', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'add-theatre.html'));
});

app.get('/movie-details', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'movie-details.html'));
});

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'payment.html'));
});

app.get('/seat-selection', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'seat-selection.html'));
});

// Catch-all route for 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
