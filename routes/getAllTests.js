import express from 'express';
import AWS from 'aws-sdk';
import { readWriteToDatabase } from '../models/readWriteToDatabase.js';

export const routerGetAllTests = express.Router();

// The client make a post request to '/deleteuser', allowing an account to be deleted from database.
routerGetAllTests.get('/getalltests', async(request, response) => {

    const documentClient = new AWS.DynamoDB.DocumentClient();

    // Check if user exists in database, if not create account else send error message
    const parametersGetAllTests = {
        TableName: process.env.TableName
    };

    try {
        const allTests = await readWriteToDatabase(documentClient, parametersGetAllTests, 'scan');
        console.log(allTests.Items);
        response.send(allTests.Items);

    } catch (error) {
        response.status(400).send(error);
    }




});