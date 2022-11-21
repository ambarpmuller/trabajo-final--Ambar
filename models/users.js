const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;



const UserSchema = new Schema ({
        email: { type: String, unique: true, lowercase: true, required: true },
        password: { type: String, required: true},
        registerDate: { type: Date,  default: Date.now() },
        favoriteSeries: [{ type: Schema.Types.ObjectId, ref: 'Serie' }]
});

//se ejecuta antes de grabar PRE SAVE - para ENCRIPTAR
UserSchema.pre("save", function(next){ 
        let user = this;

        if(!user.isModified('password')){
                return next();
        }

       bcrypt.genSalt(10, (err, salt) => {
        if(err){
                return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
        });
       });

})

//comparo la password q manda el usurario y la dela base de datos - para logearse
UserSchema.methods.comparePassword = function(password){
        let user = this;
        return bcrypt.compare(password, user.password);
}
//compareSync x compare solo
module.exports = mongoose.model('User', UserSchema);




        
    