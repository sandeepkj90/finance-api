const app = require('./app')
const { connectDB } = require('./src/configs/db')

connectDB()
app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
)
