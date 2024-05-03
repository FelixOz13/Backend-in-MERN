const { default: mongoose } = require('mongoose')

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Database Connected Successfully')
  } catch (error) {
    console.error('Database Error:', error.message)
  }
}

module.exports = dbConnect
