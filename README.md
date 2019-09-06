# Data Runner
A website to track your running statistics, heatmaps, goals, and more. Built with React, Express, and Mongoose.

### Development Usage
1. Create a `.env` file in `/backend` with the following
```
MONGODB_URI=<your MongoDB connection string>
PORT=3001
SECRET=<string used to and encrypt JWT>
```
2. Run `npm install` then `npm start` in both the `/frontend` and `/backend` directories

### Using the Website
1. Register as a new user on the homepage
2. Upload `.gpx` files to start seeing information about your runs

**Note:** `.gpx` files can be obtained from many fitness trackers (i.e. Strava) by exporting your activity. If you don't have your own `.gpx` files, some sample ones are located at the root of this project.