import { db } from '../libs/dbConnect.js';
import { ObjectId } from 'mongodb';

const collection = await db.collection('users');

export const test = async (req, res) => {
    let results = await collection.find({}).toArray();
    res.status(200).json(results);
};

export const getUser = async (req, res, next) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        // console.log(query);
        const user = await collection.findOne(query);
        // console.log(user);

        if (!user) {
            return next({ status: 404, message: 'User Not Found!' });
        }
        
        res.status(200).json(user);
    } catch (error) {
        next({ status: 500, error});
    }
};

export const updateUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const query = { _id: new ObjectId(req.params.id) };
        const data = { $set: { ...req.body, updatedAt: new Date().toISOString(), },};
        const options = { returnDocument: 'after' };
        const updatedUser = await collection.findOneAndUpdate(query, data, options);
        const { password: pass, updatedAt, createdAt, ...rest } = updatedUser;
        res.status(200).json(updatedUser);
    } catch (error) {
        next({ status: 500, error });
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        const query = { _id: new ObjectId(req.params.id) };
        // console.log(query);
        await collection.deleteOne(query);
        res.status(200).json({ message: 'User Deleted Successfully!' });
    } catch (error) {
        next({ status: 500, error });
    }   
};