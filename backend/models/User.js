const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function run() {
  const password = "1234"; // the plain password you want to hash
  const hashed = await bcrypt.hash(password, 10);
  console.log("Plain password:", password);
  console.log("Hashed password:", hashed);
}  

run();

const UserSchema= new mongoose.Schema({

    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
profileImageUrl: {
    type: String,
}
},
{timestamps: true}
);
UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
}
);

UserSchema.methods.comparePassword = async function(candidatepassword) {
    return await bcrypt.compare(candidatepassword, this.password);
}
module.exports = mongoose.model("User", UserSchema);
