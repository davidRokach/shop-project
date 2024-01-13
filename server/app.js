const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { routesInit } = require("./routes/configRoutes");
const cookieParser = require("cookie-parser");
require("./db/mongoConnect");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.68.109:5173",
  "http://25.54.37.0:5173/",
];

// Enable cross-origin requests from the specified origin
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Enable file uploads from the client to the server
// Limit file size to 5MB and use temporary files on the server
app.use(
  fileUpload({
    limits: { fileSize: "5mb" },
    useTempFiles: true,
  })
);

// Parse cookies attached to incoming requests
app.use(cookieParser());

// Parse JSON request bodies with a limit of 5MB
app.use(express.json({ limit: "5mb" }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Initialize routes
routesInit(app);

const server = http.createServer(app);

// Determine the port on which the server should listen
// If the environment variable "PORT" is set, use its value; otherwise, use 3003 as the default port
const port = process.env.PORT || 3003;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
