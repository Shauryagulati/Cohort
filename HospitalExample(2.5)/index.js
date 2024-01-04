const express = require("express");
const app = express();

var users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/", function(req, res) {
    //Return How many kidneys He has and How many are healthy
    let johnsKidneys = users[0].kidneys;
    let numberOfKidneys = johnsKidneys.length;

    //Filter Function to be done here
    let numberOfHealthyKidneys = 0;
    for(let i=0; i<johnsKidneys.length; i++) {
        if(johnsKidneys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post("/", function(req, res) {

    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done"
    })
})

app.put("/", function(req, res) {
    for(let i=0; i<users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({
        msg: "Done"
    })
})

//Removing all the Unhealthy Kidneys
app.delete("/", function(req, res) {

    if(isThereAtLeastOneUnhealthyKidney()) {
        const newKidneys = [];
        for(let i=0; i<users[0].kidneys.length; i++) {
            if(users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg: "Done"
        })
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        })
    } 
})

function isThereAtLeastOneUnhealthyKidney() {
    let atLeastOneUnhealthyKidney = false;
    for(let i=0; i<users[0].kidneys.length; i++) {
        if(!users[0].kidneys[i].healthy) {
            atLeastOneUnhealthyKidney = true;
        }
    }
    return atLeastOneUnhealthyKidney;
}

app.listen(3000);
