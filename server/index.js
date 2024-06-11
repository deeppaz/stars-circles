import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
const app = express();

app.use(cors());
dotenv.config();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = 8000;
app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, async () => {
  console.log(`Server on localhost:${PORT}`);
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("Successfully connected to DB");
  } catch (error) {
    console.log("Error to connect DB");
  }
});

const users = [{ username: "user", password: "user123" }];

app.post("/auth/signup", async (req, res) => {
  try {
    const user = req.body;
    const { username, password } = user;

    const isUsernameAllreadyExist = users.find(
      (value) => value.username == username
    );

    if (isUsernameAllreadyExist) {
      res.status(400).json({
        status: 400,
        message: "This username is exist, try another one!",
      });
      return;
    }
    const newUser = users.push({
      username,
      password,
    });

    res.status(200).json({
      status: 201,
      success: true,
      message: " User created Successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
    console.log(error);
  }
});

app.post("/auth/signin", async (req, res) => {
  try {
    const user = req.body;
    const { username, password } = user;

    const isUserExist = users.find(
      (value) => value.username == username && value.password == password
    );
    if (!isUserExist) {
      res.status(404).json({
        status: 404,
        success: false,
        message: "Username or password is wrong",
      });
      return;
    }

    const token = jwt.sign(
      { _id: isUserExist?._id, username: isUserExist?.username },
      "YOUR_SECRET",
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully Logged in!",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message.toString(),
    });
  }
});
