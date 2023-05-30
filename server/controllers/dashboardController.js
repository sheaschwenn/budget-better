const{User} = require('./../models');


module.exports= {
    getUser(req, res){
        User.findOne({"id goes here": "id goes here"})
        .select("-__v")
        .then((user) => 
        !user ? res.status(404).json({message: "no user with this ID"}): res.json(user))
        .catch((err) => res.status(500).json(err))
    }
}