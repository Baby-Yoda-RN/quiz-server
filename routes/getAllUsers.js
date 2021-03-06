import express from "express";
import AWS from "aws-sdk";
import { readWriteToDatabase } from "../models/readWriteToDatabase.js";
import { delayTime } from "../constants/index.js";

export const routerGetAllUsers = express.Router();

// The client make a post request to '/deleteuser', allowing an account to be deleted from database.
routerGetAllUsers.post("/getallusers", async (request, response) => {
  const documentClient = new AWS.DynamoDB.DocumentClient();

  // Check if user exists in database, if not create account else send error message
  const parametersGetAllUsers = {
    TableName: process.env.UsersTableName,
  };

  try {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(delayTime);

    if (request.body.DATABASE_KEY === process.env.DATABASE_KEY) {
      const allUsers = await readWriteToDatabase(
        documentClient,
        parametersGetAllUsers,
        "scan"
      );
      console.log(allUsers);
      response.send(allUsers);
    } else {
      response.status(400).send("Wrong Database Credentials");
    }
  } catch (error) {
    response.status(400).send(error);
  }
});
