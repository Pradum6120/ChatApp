import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import db from './Db/index.js'; // ES Module import
import UserRoutes from './routes/user.routes.js'; // ES Module import
import messageRoutes from './routes/message.routes.js'
import { server,app } from './Socket.io/server.js';

// Initialize environment variables
dotenv.config();

// Initialize the app

// Middleware
const corsOption={
  origin:' http://localhost:5173',
  credentials:true
};
app.use(cors(corsOption)); 
app.use(bodyParser.json());

// Database connection
db();  // Initialize database connection

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use the user routes for user-related API endpoints
app.use('/api/users', UserRoutes); 
app.use('/api/message', messageRoutes);

// Start server
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
