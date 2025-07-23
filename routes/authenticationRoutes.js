import express from "express";

import { LoginAppCtrl, createUserCtrl} from '../controllers/authenticationController.js'

import Jwt from 'jsonwebtoken';
const {jwt}=Jwt;

function verifyToken(req, res, next) {
    console.log("verify token",req.headers.authorization)
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    console.log("verify token",token)
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = Jwt.verify(token,process.env.SecretKey)
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

const route = express.Router()

route.post("/login", LoginAppCtrl)
route.post("/create", createUserCtrl)

export default route;