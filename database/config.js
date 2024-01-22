const { default: mongoose } = require("mongoose")

const dbConnection = async () => {

  try {

    await mongoose.connect( process.env.DB_CNN)
    console.log('DB Connected');
    
  } catch (error) {

    console.log(error);
    throw new Error('db error connection')
    
  }

}

module.exports = {
  dbConnection
}