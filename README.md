# Restaurant Management System

A modern restaurant management system built with React, TypeScript, and Supabase.

## Features

- Real-time order management
- Table reservation system
- Menu management
- Order tracking
- Analytics dashboard
- Take-away order support

## Tech Stack

- Frontend:
  - React
  - TypeScript
  - Tailwind CSS
  - Chart.js
  - Lucide Icons

- Backend:
  - Node.js
  - Express
  - Supabase

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/restaurant-management-system.git
```

2. Install dependencies:
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

3. Set up environment variables:

### Frontend
Create a `.env` file in the root directory with:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend
Create a `.env` file in the backend directory with:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
```

4. Start the development servers:
```bash
# Frontend
npm run dev

# Backend
cd backend
npm run dev
```

## Project Structure

- `/src` - Frontend source code
  - `/components` - Reusable React components
  - `/context` - React context for state management
  - `/pages` - Main application pages
  - `/data` - Mock data and types
- `/backend` - Backend server code

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT