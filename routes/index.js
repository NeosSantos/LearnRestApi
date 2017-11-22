module.exports = function(app){
    require('./userRouter')(app);
    require('./foodRouter')(app);
    require('./orderRouter')(app);
    require('./containerRouter')(app);
};
