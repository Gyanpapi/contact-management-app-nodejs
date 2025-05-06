const asyncHandler = require('express-async-handler');

const Contact = require('../models/contactModel.js');
const getContacts= asyncHandler( async (req,res)=>
    {
        const contacts= await Contact.find({user_id: req.user.id});

         res.status(200).json(contacts);
    });

const createContact= asyncHandler(async (req,res)=>
    {
        if(req.body.name==null || req.body.email==null || req.body.phone==null)
        {
            res.status(401);
            throw new Error("Please include name, email and phone");
            
        }

        const name=req.body.name;
        const email= req.body.email;
        const phone=req.body.phone;
        
        const contact= await Contact.create({name,email,phone,user_id: req.user.id});
        res.status(201).json({name,email,phone});
         
    });

const getContact= asyncHandler( async (req,res)=>
    {
        const contact= await Contact.findById(req.params.id);
        if(!contact)
        {
            res.status(404);
            throw new Error("Contact not found");
        }
         res.status(202).json(contact);
    });

const updateContact= asyncHandler(async (req,res)=>
{
    const contact= await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("Contact not found");
        }


    if(contact.user_id.toString()!=req.user.id)
    {
        res.status(403);
        throw new Error("Unauthorized access");
    }
    const updatedContact= await Contact.findByIdAndUpdate(req.params.id,req.body,
        {new:true});
    res.status(203).json(contact);
});

const deleteContact= asyncHandler( async (req,res)=>
{
    const contact= await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("Contact not found");
        }

    
    if(contact.user_id.toString()!=req.user.id)
    {
        res.status(403);
        throw new Error("Unauthorized access");
    }
    const contact1= await Contact.findByIdAndDelete(req.params.id);
    res.status(201).json(contact);
});

module.exports= {getContacts,createContact,getContact,updateContact,deleteContact};