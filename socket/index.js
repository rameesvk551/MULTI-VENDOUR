const socketIo = require("socket.io");
const http = require("http");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config({ path: "./.env" });

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",  // Allow all origins (change as needed)
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// In-memory storage
let users = [];
let messages = {}; // Store messages per receiver

// Function to add a user
const addUser = (userId, socketId) => {
    if (!users.some(user => user.userId === userId)) {
        users.push({ userId, socketId });
    }
};

// Function to remove a user
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

// Function to get a user by receiver ID
const getUser = (receiverId) => {
    return users.find(user => user.userId === receiverId);
};

// Function to create a message object
const createMessage = ({ senderId, receiverId, text, images }) => ({
    id: new Date().getTime(), // Generate unique message ID
    senderId,
    receiverId,
    text,
    images,
    seen: false,
    timestamp: new Date()
});

// WebSocket connection
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Handle user login and store socket ID
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    // Handle message sending
    socket.on("sendMessage", ({ senderId, receiverId, text, images }) => {
        const message = createMessage({ senderId, receiverId, text, images });
        const user = getUser(receiverId);

        // Store messages
        if (!messages[receiverId]) {
            messages[receiverId] = [];
        }
        messages[receiverId].push(message);

        // Send message to the receiver if they are online
        if (user) {
            io.to(user.socketId).emit("getMessage", message);
        }
    });

    // Handle message seen event
    socket.on("messageSeen", ({ senderId, receiverId, messageId }) => {
        const user = getUser(senderId);

        if (messages[receiverId]) {
            const message = messages[receiverId].find(
                msg => msg.senderId === senderId && msg.id === messageId
            );

            if (message) {
                message.seen = true;
                
                // Notify sender that their message was seen
                io.to(user?.socketId).emit("messageSeen", {
                    senderId,
                    receiverId,
                    messageId
                });
            }
        }
    });

    // Update and get the last message
    socket.on("updateLastMessage", ({ lastMessage, lastMessageId }) => {
        io.emit("getLastMessage", { lastMessage, lastMessageId });
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

// Start the server
const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
