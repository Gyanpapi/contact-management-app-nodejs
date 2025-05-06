const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const User = require("../models/userModel");
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser= asyncHandler(async(req,res)=>
{
    const {username,email,password} = req.body;
    
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("something missing");
        
    }
    const userAlready= await User.findOne({email});

    if(userAlready)
    {
        res.status(400);
        throw new Error("something missing");
    }

    const hashedPassword=  await bcrypt.hash(password,10);

    const user = await User.create(
        {
            username,email,password: hashedPassword
        }
    );

    if(user)
    {
        res.status(201).json({__id: user.id, email: user.email});
    }
    else
    {
        res.status(400);
        throw new Error("user data not valid");
    }
}
);

const loginUser=asyncHandler (async (req,res)=>
{
    const {email,password} = req.body;
    
    if(!email || !password)
    {
        res.status(400);
        throw new Error("something missing");
        
    }
    const user= await User.findOne({email});

    if( user &&  (await bcrypt.compare(password,user.password)))
    {
        const accessToken= jwt.sign(
            {
                user:
                {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10m" }
        );

        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("something is missing in fields");
    }
});


const currentUser= asyncHandler( async (req,res)=> 
{
    console.log(req.user);
    res.json(req.user)
} );
module.exports={registerUser,loginUser,currentUser};