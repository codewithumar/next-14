import connect from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';


connect();

export async function POST(request:NextRequest ){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log( email, password);

        if ( !email || !password) {
            return NextResponse.json(
                {error: 'Please Fill All  Fields'},
                {status:400});
        }            
        const user = await User.findOne({
            email
        });

        if (user) {
            return NextResponse.json(
                {error: 'User Already Exists'},
                {status:400});
        }
 
        
        const hashedPassword = await bcryptjs.hash(password, "saffffffff234tgv34rtgvlt");
        const newUser = new User({
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log(savedUser)

        return NextResponse.json(
            {message: 'User Created Successfully',
            success: true,
            savedUser
            },
            {status:201});  


    } catch (error:any) {
        return NextResponse.json(
            {error: error.message},
            {status:500});
    }
    
}



