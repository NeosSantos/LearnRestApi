module.exports = function(app){
    require('./userRouter')(app);
    require('./foodRouter')(app);
};
