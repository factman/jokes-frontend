//Install express serverconst
express = require('express');
const path = require('path');
const app = express();

try {
// Serve only the static files form the dist directory
app.use(express.static(__dirname + './dist/jokes-frontend'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+'./dist/jokes-frontend/index.html'));
});
} catch (ex) {
  console.log(ex.message)
};

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
