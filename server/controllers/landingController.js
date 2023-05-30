const{User} = require('../models')

module.exports = {
createUser(req,res){
    User.create(req.body)
    // .select('-__v')
    .then((user) => res.json(user))
    .catch((err)=>{
        console.log(err);
        return res.status(500).json(err)
    })
}
}