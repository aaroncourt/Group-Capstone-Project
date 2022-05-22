const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`,{
    UseNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log(`Connecting is Established to the Days_of_Adventure DB`))
    .catch((err) => console.log('connection failed to Days_of_Adventure',err))
