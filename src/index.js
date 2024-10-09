import express from 'express';
import { auth } from 'express-oauth2-jwt-bearer'; // Importing the Auth0 middleware
import categoriesRouter from './routes/categories.js'; // Categories route
import eventsRouter from './routes/events.js'; // Events route
import usersRouter from './routes/users.js'; // Users route
import loginRouter from './routes/login.js'; // Public route (no JWT required)
import 'dotenv/config'; // Ensure you load environment variables from .env

const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000

// JWT middleware setup - this will validate JWT tokens for protected routes
const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE, // Audience (API identifier) from Auth0
  issuerBaseURL: process.env.AUTH0_DOMAIN, // Your Auth0 domain (issuer URL)
  tokenSigningAlg: 'RS256', // Algorithm for signing the JWT (Auth0 uses RS256)
});

// Middleware to parse incoming JSON data
app.use(express.json());

// Public route - No JWT required for login (users log in and get their JWT)
app.use('/login', loginRouter);

// Protect routes with JWT middleware (jwtCheck)
app.use('/categories', jwtCheck, categoriesRouter); // Protected route for categories
app.use('/events', jwtCheck, eventsRouter); // Protected route for events
app.use('/users', jwtCheck, usersRouter); // Protected route for users

// Example public route (no authentication needed)
app.get('/', (req, res) => {
  res.send('Hello from Activities API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

/**
 * --- How This API Works ---
 *
 * 1. User logs in via `/login` (handled by login.js):
 *    - User provides their credentials (username, password) to `/login`.
 *    - login.js sends the credentials to Auth0, and if valid, receives a JWT token.
 *    - The JWT token is returned to the user, which they must include in future requests.
 *
 * 2. User makes a request to a protected route (e.g., `/categories`, `/events`, `/users`):
 *    - After logging in, the user includes the JWT token in the `Authorization` header.
 *      Example:
 *        Authorization: Bearer <JWT_TOKEN>
 *
 * 3. JWT validation in index.js:
 *    - The `jwtCheck` middleware is applied to the `/categories`, `/events`, and `/users` routes.
 *    - `jwtCheck` verifies that the token is valid, signed by Auth0, and contains the correct audience.
 *    - If valid, the request is passed to the respective route handler (e.g., categoriesRouter).
 *    - jwtCheck validates the JWT token in the Authorization header, and only if it's valid does the request continue to the categoriesRouter.
 *
 * 4. Route handlers:
 *    - Once the JWT token is validated, the route handlers (e.g., `categories.js`, `events.js`, `users.js`) process the request.
 *    - The route handlers are responsible for fetching, creating, updating, or deleting resources.
 *
 * --- Flow ---
 * 1. User sends credentials to `/login` and receives a JWT from Auth0.
 * 2. User sends a request to `/categories`, `/events`, or `/users` with the JWT in the header.
 * 3. `jwtCheck` middleware in `index.js` validates the JWT token.
 * 4. If valid, the request is passed to the corresponding route handler (e.g., categories.js).
 *
 * --- Example of a Protected Request ---
 * GET /categories
 * Authorization: Bearer <JWT_TOKEN>
 */
