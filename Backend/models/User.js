const mongoose=require('mongoose')
const Validator=require('validator')
const bcrypt=require('bcrypt')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate:[Validator.isEmail,'Please enter a valid emaail']
    },
    password:{
        type:String,
        require:true,
        min:8,
    },
    role:{
        type:String,
        enum:['admin','listener'],
        default:'listener'
    }
},{
    timestamps:true
})

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;

    this.password=await bcrypt.hash(this.password,12);

})
userSchema.methods.matchPassword=async function(enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}
const User= mongoose.model('User',userSchema)

module.exports =User;
