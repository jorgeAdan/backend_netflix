const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const createSubscription =  require('../utils/createSubscription');
const createCustomer =  require('../utils/createCustomer');

const SALT_WORK_FACTOR = 10


const Schema =  mongoose.Schema

const UserSchema = new Schema({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    birth_date:{
        type:Date
    },
    gender:{
       type:String,
       enum:["Male","Female"] 
    },
    nationality:{
        type:String
    },
    user_payment:{type:String},
    subscription_id:{
        type:Schema.Types.ObjectId,
        ref:"subscriptions"
    },
    history:[
        {
            type:Schema.Types.ObjectId,
            ref:'movies'
        }
    ],
    favorites:[
        {
            type:Schema.Types.ObjectId,
            ref:'movies'
        }
    ],
    is_active:{
        type:Boolean,
        default:true
    }

},{'collection':'users','timestamps':true})

UserSchema.pre('save',function(next){
    let user = this
    if(!user.isModified('password')){return next();}
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err) return next(err)
        bcrypt.hash(user.password,salt,async function(err,hash){
                if (err) return next(err);
                user.password =  hash;
                const {_id} =  await createSubscription()
                user.subscription_id = _id
                const {id} =  await createCustomer(user.email)
                user.user_payment =  id
                next();
        })
    })



});

UserSchema.methods.comparePassword = function (candidate,cb) {
    console.log(this.password)
    bcrypt.compare(candidate,this.password,function(err,isMatch){
        cb(err,isMatch)
    })

}

module.exports = mongoose.model('users',UserSchema);