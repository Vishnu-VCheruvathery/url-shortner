require('dotenv').config();
const express = require('express');
const {connectToMongoDB} = require('./connect');
const urlRoute = require('./routes/url');
const URL = require('./models/url');
const app = express();
const PORT = 8001;

connectToMongoDB(process.env.MONGO_URL)
.then(() => console.log("Mongodb connected!"))

app.use(express.json());
app.use("/url", urlRoute);


app.get('/:shortId', async(req,res) => {
      const shortId = req.params.shortId;
      console.log(shortId)
      const entry = await URL.findOneAndUpdate({
        shortID: shortId
      }, {$push: {
        visitHistory: {
            timestamp :  Date.now()
        }
      }})
    console.log(entry);
     if(!entry){
        res.status(400).json({message: 'no redirect url'});
     }

     return res.redirect(entry.redirectURL);
})


app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));