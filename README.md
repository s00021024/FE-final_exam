# Project EPICar overview and features
EPICar is a web application designed for managing cars and transactions.
Users can browse a car catalog, buy cars using a shopping cart system and view their personal order history through a dedicated page.
The admin dashboard allows managing the car database through CRUD operations (Create, Read, Update, Delete) and monitoring user transactions.

## Technologies used
- **Frontend:** React 19 / Vite
- **State management:** Redux (Redux Toolkit)
- **Routing:** React Router 7
- **Icons:** React Icons / FontAwesome 6 (FA6)
- **Loaders:** React Loading indicators
- **Notifications:** React Toastify
- **Styling library:** Tailwind CSS 4
- **API management:** Thunk (Redux Toolkit)
- **Data Fetching:** Native fetch API
- **Backend & Database:** JSON Server

## Database Schema
`db.json` structured into three main collections:
- `cars`: Cars inventory.
- `users`: User profiles and roles.
- `orders`: Transaction records.

## Running instructions
**Frontend setup**
1. Clone the repository
2. Install Node.js (https://nodejs.org/en/download)
3. Open terminal
4. Navigate to the main folder
5. Install dependencies (npm install)
6. Launch the App (npm run dev)

**Backend Setup (json server)**
1. Open a new window in terminal
2. Navigate to "server" folder
3. Install json server (npm install json-server)
4. Launch the server (npm run dev)

### The application will be available at http://localhost:5173

## Default users

-  `administrator`:
email: admin@email.com
password: admin
-  `client`:
email: client@email.com
password: client



## Credits
- Favicon from https://fontawesome.com
- React Icons from https://www.npmjs.com/package/react-icons
- React Loaders from https://react-loading-indicators.netlify.app
- React Toastify from https://www.npmjs.com/package/react-toastify
- CSS style from https://tailwindcss.com 
- Database car logos from https://github.com/filippofilip95/car-logos-dataset
- Image placeholder from https://placehold.co