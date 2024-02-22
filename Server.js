require('dotenv').config();
var createError    = require('http-errors');
const express      = require('express');
const app          = express();
const cors         = require('cors');
const logger       = require('morgan');
const fs           = require('fs');
const http         = require('http');
const server       = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

const logStream = fs.createWriteStream('./logs/logger.log', { flags: 'a' });
app.use(logger('combined', { stream: logStream }));


const pathConfig = require("./path");
global.__base              = __dirname  +                                  "/";
global.__path_app          = __base     + pathConfig.folder_app          + "/";
global.__path_models       = __path_app + pathConfig.folder_models       + "/";
global.__path_routers      = __path_app + pathConfig.folder_routers      + "/";
global.__path_configs      = __path_app + pathConfig.folder_configs      + "/";
global.__path_controllers  = __path_app + pathConfig.folder_controllers  + "/";
global.__path_commons      = __path_app + pathConfig.folder_commons      + "/";

app.use('/api/v1/', require(__path_routers));
app.use(function(req,res, next){
    next(createError(404));
});

app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error   = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.end("Error App");
});

const PORT = process.env.PORT || 3000;
const sequelize = require(__path_configs + 'database');
sequelize.sync().then(() => {
    server.listen(PORT, () => console.log(`Server running to port ${PORT}`));
});



