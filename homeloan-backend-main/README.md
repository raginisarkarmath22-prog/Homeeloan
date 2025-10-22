loan-backend/
├── config/
│   └── db.js                  # Database connection config
├── controllers/
│   └── bankController.js      # Handles logic for bank-related routes
│   └── userController.js      # Handles logic for Register-related routes
├── middleware/
│   └── (Optional middlewares if needed, e.g., auth, errorHandler)
├── models/
│   └── bankModel.js           # Bank schema/model (if using ORM or for structure)
├── routes/
│   └── bankRoutes.js          # API routes for bank endpoints
├── services/
│   └── bankService.js         # Business logic for bank operations
├── node_modules/              # Installed dependencies
├── .env                       # Environment variables (e.g., DB credentials)
├── .gitignore                 # Git ignored files/folders
├── app.js                     # Express app setup (routes, middleware)
├── server.js                  # Entry point (starts server)
├── package.json               # Project metadata and dependencies
├── package-lock.json          # Exact dependency tree (auto-generated)
└── README.md                  # Project description & instructions
