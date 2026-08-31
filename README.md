# WanderLust

A server-rendered travel-listing application for discovering, creating, editing, reviewing, and managing accommodation listings.

## Live demo

The live app is linked in this repository’s **About** section.

## Features

- Browse, search, create, edit, and delete listings
- User registration and session-based authentication
- Listing reviews and ratings
- Image uploads through Cloudinary
- Server-rendered EJS views with reusable layouts and flash messages

## Tech stack

Node.js · Express · MongoDB · Mongoose · EJS · Passport · Cloudinary · Joi

## Architecture

```text
controllers/            # Listing, review, and user workflows
models/                 # MongoDB schemas
routes/                 # HTTP routes
views/                  # EJS page templates and shared layouts
public/                 # CSS and browser scripts
config/                 # Database and Cloudinary setup
```

## Run locally

```bash
git clone https://github.com/Kunal-Gupta28/WanderLust.git
cd WanderLust
npm install
```

Create `.env`:

```env
PORT=3000
NODE_ENV=development
ATLASDB_URL=your_mongodb_connection_string
SECRET=replace_with_a_long_random_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRECT=your_cloudinary_api_secret
ADMIN_EMAIL=admin@example.com
```

Start the application:

```bash
node app.js
```

Open `http://localhost:3000`.

> `CLOUD_API_SECRECT` uses the spelling currently expected by the codebase.
