const express = require('express');
const cors = require('cors');
const parkingData = require('./data/parkingData');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes 
app.get('/', (req, res) => {
    res.json({
        message: '🚗 Smart Parking System Backend is running!',
        endpoints: {
            'GET /api/parking-spots': 'Get all parking spots',
            'GET /api/parking-spots/available': 'Get available spots',
            'POST /api/book-parking': 'Book a parking spot',
            'GET /api/stats': 'Get system statistics',
           
            
        }
    });
});



// User data 
const users = [
    
    {
        id: 1,
        username: 'user',
        password: 'user123',
        name: 'Regular User',
        role: 'user',
        email: 'user@parking.com'
    }
];

// Login 
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        res.json({
            success: true,
            message: 'Login successful',
            user: userWithoutPassword,
           
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid username or password'
        });
    }
});




app.get('/api/parking-spots', (req, res) => {
    res.json({
        success: true,
        data: parkingData.parkingSpots
    });
});

// Get available 
app.get('/api/parking-spots/available', (req, res) => {
    const availableSpots = parkingData.parkingSpots.filter(spot => spot.status === 'available');
    res.json({
        success: true,
        data: availableSpots
    });
});

// Booking
app.post('/api/book-parking', (req, res) => {
    const { spotId, vehicleNumber, duration, paymentMethod } = req.body;
    
    const spot = parkingData.parkingSpots.find(spot => spot.id === spotId);
    
    if (!spot) {
        return res.status(404).json({
            success: false,
            message: 'Parking spot not found'
        });
    }
    
    if (spot.status !== 'available') {
        return res.status(400).json({
            success: false,
            message: 'Parking spot is not available'
        });
    }
    
    // Update spot status
    spot.status = 'occupied';
    spot.vehicleNumber = vehicleNumber;
    spot.bookedAt = new Date().toISOString();
    spot.duration = duration;
    
    const price = spot.pricePerHour * duration;
    
    res.json({
        success: true,
        message: 'Parking spot booked successfully!',
        data: {
            spotId: spot.id,
            vehicleNumber,
            duration,
            totalPrice: price,
            bookedAt: spot.bookedAt
        }
    });
});

// Get statistics
app.get('/api/stats', (req, res) => {
    const totalSpots = parkingData.parkingSpots.length;
    const availableSpots = parkingData.parkingSpots.filter(spot => spot.status === 'available').length;
    const occupiedSpots = parkingData.parkingSpots.filter(spot => spot.status === 'occupied').length;
    const reservedSpots = parkingData.parkingSpots.filter(spot => spot.status === 'reserved').length;
    
    res.json({
        success: true,
        data: {
            totalSpots,
            availableSpots,
            occupiedSpots,
            reservedSpots,
           
        }
    });
});


// Start 
app.listen(PORT, () => {
    console.log(`🚗 Smart Parking Backend running on http://localhost:${PORT}`);
    console.log(`📊 Try these URLs in your browser:`);
    console.log(`   http://localhost:${PORT}/api/parking-spots`);
    console.log(`   http://localhost:${PORT}/api/stats`);
});


