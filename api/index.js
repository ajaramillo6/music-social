const express = require("express");
const app = express();
const mongoose = require('mongoose');
//Used for env file use
const dotenv = require("dotenv");
//Middleware used with express
const helmet = require("helmet");
//Middleware used with express (req,res)
const morgan = require("morgan");
//Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
//Router
const router = express.Router();
//Used for uploading files
const multer = require('multer');
const path = require("path");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=>{
        console.log("Connected to MongoDB")
    }
);

app.use("/images", express.static(path.join(__dirname, "public/images")))

//Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb)=> {
        cb(null,req.body.name)
    },
})

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully!")
    } catch(err) {
        console.error(err);
    }
})

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(8800, ()=>{
    console.log("Backend server is running!")
})