const parkingSpots = [
    {
        id: 'A-101',
        name: 'A-101',
        pricePerHour: 3,
        location: 'Downtown',
        status: 'available',
        vehicleNumber: null,
        bookedAt: null,
        duration: null
    },
    {
        id: 'A-102',
        name: 'A-102',
        pricePerHour: 3,
        location: 'Downtown',
        status: 'available',
        vehicleNumber: null,
        bookedAt: null,
        duration: null
    },
    {
        id: 'A-103',
        name: 'A-103',
        pricePerHour: 3,
        location: 'Downtown',
        status: 'occupied',
        vehicleNumber: 'ABC123',
        bookedAt: '2024-01-15T10:30:00Z',
        duration: 2
    },
    {
        id: 'B-201',
        name: 'B-201',
        pricePerHour: 4,
        location: 'Mall',
        status: 'available',
        vehicleNumber: null,
        bookedAt: null,
        duration: null
    },
    {
        id: 'B-202',
        name: 'B-202',
        pricePerHour: 4,
        location: 'Mall',
        status: 'reserved',
        vehicleNumber: 'XYZ789',
        bookedAt: '2024-01-15T11:00:00Z',
        duration: 3
    },
    {
        id: 'B-203',
        name: 'B-203',
        pricePerHour: 4,
        location: 'Mall',
        status: 'available',
        vehicleNumber: null,
        bookedAt: null,
        duration: null
    }
];

module.exports = {
    parkingSpots
};