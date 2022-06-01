const express = require('express')

var path = require('path');
const app = express()


app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.sendFile('public/index.html', { root: __dirname });
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;