import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transationData from "../models/transactionModel.js";

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Create JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(201).json({ message: "User registered successfully", success: true, token, user: { name: newUser.name } });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: error.message, success: false, error });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        res.status(200).json({ message: "Login successful", success: true, token, user: { name: user.name } });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: error.message, success: false, error });
    }
};

const userCredits = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({ message: "User credits retrieved successfully", success: true, credits: user.creditBalance, user: { name: user.name } });
    } catch (error) {
        console.error("Error retrieving user credits:", error);
        res.status(500).json({ message: error.message, success: false, error });
    }
};


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        const { planId } = req.body
        const userId = req.user.id;
        const userData = await User.findById(userId)
        if (!userId || !planId) {
            return res.json({ success: false, message: 'MissingDetails' })
        }

        let credits,plan,amount,date;

        switch (planId){
            case 'Basic':
                plan = 'Basic'
                credits =100
                amount = 10
                break;
            case 'Advanced':
                plan = 'Advanced'
                credits =500
                amount = 50
                break;
            case 'Business':
                plan = 'Business'
                credits =5000
                amount = 250
                break;
            default:
                return res.json({success:false,message:'plan not found'});
        }
        date =Date.now();

        const transationsData={
            userId,plan,amount,credits,date

        }
        const newTransaction=await transationData.create(transationsData)

        const options={
            amount :amount *100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id

        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if(error){
                console.log(error);
                return res.json({succes:false,message:error})
            }
            res.json({success:true,order})
        })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

const verifyRazorpay = async (req,res)=>{
    try {
        const {razorpay_order_id}=req.body;
        const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid'){
            const transactionDoc = await transationData.findById(orderInfo.receipt);
            if(transactionDoc.payment){
                return res.json({success:false,message:'payment Failed'})
            }

            const userData =await User.findById(transactionDoc.userId)

            const creditBalance =  userData.creditBalance+ transactionDoc.credits

            await User.findByIdAndUpdate(userData._id, { creditBalance });

            await transationData.findByIdAndUpdate(transactionDoc._id,{payment:true})

            res.json({success:true,message:"Credits Added"})
        }else{
            res.json({success:false,message:"Payment Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }
}

export { registerUser, loginUser, userCredits,paymentRazorpay,verifyRazorpay };