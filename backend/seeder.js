const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const User = require('./models/User');
const Task = require('./models/Task');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Task.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.create([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: 'password123',
            },
            {
                name: 'Jane Doe',
                email: 'jane@example.com',
                password: 'password123',
            }
        ]);

        const adminUser = createdUsers[0]._id;

        const sampleTasks = [
            {
                text: 'Review project requirements',
                user: adminUser,
                completed: true,
            },
            {
                text: 'Set up development environment',
                user: adminUser,
                completed: true,
            },
            {
                text: 'Implement authentication',
                user: adminUser,
                completed: false,
            },
        ];

        await Task.insertMany(sampleTasks);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Task.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
