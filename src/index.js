const app = require('./app')
// const port = process.env.PORT || 3000;
const port = 3000;

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});