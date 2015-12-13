var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var expressJWT = require('express-jwt');
var jwt        = require('jsonwebtoken');
var app        = express();

var secret     = "tedchatappbycharlie";