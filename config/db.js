import mongoose from 'mongoose'

const connection = mongoose.createConnection('mongodb://localhost:27017')

export default connection;