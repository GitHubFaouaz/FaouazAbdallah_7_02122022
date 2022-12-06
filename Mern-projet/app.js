const express = require('express');
const  cookieParser  = require( 'cookie-parser' );
const userRoutes = require('./routes/user.Routes');
const postRoutes = require('./routes/post.Routes');
require('dotenv').config({path:'./config/.env'});
require('./config/db');
const {checkUser , requireAuth} = require('./middleware/auth.middleware');// on appelle directement la fonction  checkUser dans auth.middleware
const morgan = require('morgan');
const app =express();


app.use(express.json());
app.use(cookieParser());

app.use(morgan('tiny'));


//jwt ( on va controle l'utilisateur avec les token quand il se connect et deconnect  )

app.get('*', checkUser);// * sur toutes les troutes tu va cheker (voir a chaque requette ) si l'utilisateur a le bon token 
app.get('/jwtid', requireAuth, (req, res) => { // faire un controle  du token qui sera fait une seule fois lors de la connextion  
    res.status(200).send(res.locals.user._id);
  });

// les routeurs
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);





module.exports= app;
