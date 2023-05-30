const{Settings, User} = require('../models')

module.exports = {

    updateSetting(req, res){
        Settings.findOneAndUpdate(
            // need id here somehow
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((setting) =>
            !setting? res.status(404).json({message: 'No setting matching that id'}): res.json(setting)
        ).catch((err) => res.status(500).json(err))
    }
}
