# Tourism Explorer

Tourism Explorer is a modern travel exploration website that provides users with an intuitive interface for browsing and searching travel information.

## Features

- 🏨 Featured Hotel Showcase
- 🔍 Smart Search Functionality
- 🌤️ Real-time Weather Information
- 💰 Multi-currency Support
- 🎟️ Exclusive Travel Discounts
- 📱 Responsive Design

## Tech Stack

- React 18
- Tailwind CSS
- Babel
- Hero Icons
- Vite

## Quick Start

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Visit `http://localhost:5173` in your browser

## Project Structure

```
front-end/
├── index.html          # Main page
├── .vite/             # Vite configuration directory
└── .gitignore         # Git ignore file
```

## Main Components

- Header: Website navigation bar
- Hero: Main page banner
- HotelCarousel: Hotel showcase carousel
- WeatherCard: Weather information card
- DiscountBar: Discount information bar

## API Integration

The frontend is designed to work with three main API endpoints. Backend developers should implement these endpoints to provide the necessary data:

### 1. Weather Information API
```typescript
GET /api/weather
Response: {
  city: string;
  temperature: string;
  status: string;
  suggestion: string;
}
```
This endpoint provides real-time weather information for the selected location.

### 2. Hotel Search API
```typescript
GET /api/hotels
Query Parameters:
  - location: string
  - checkIn: string (YYYY-MM-DD)
  - checkOut: string (YYYY-MM-DD)
  - guests: number
Response: {
  hotels: Array<{
    id: string;
    title: string;
    img: string;
    price: number;
    rating: number;
    location: string;
  }>;
}
```
This endpoint returns hotel search results based on user criteria.

### 3. Currency Conversion API
```typescript
GET /api/currency/convert
Query Parameters:
  - from: string (currency code)
  - to: string (currency code)
  - amount: number
Response: {
  convertedAmount: number;
  rate: number;
  timestamp: string;
}
```
This endpoint handles currency conversion for displaying prices in different currencies.

## Development Notes

- Built with React 18
- Styled using Tailwind CSS
- JSX transformation with Babel
- Responsive design for all devices
- API integration ready for backend implementation

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License

## Contact

For any questions or suggestions, please contact us through:
- Project Issues
- zhan2433
