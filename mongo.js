const mongoose = require('mongoose')

if (process.argv.length >= 3) {
  // Connect to MongoDB
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack:${password}@cluster0.anvn2mf.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
  mongoose.set('strictQuery', false)
  mongoose.connect(url)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// Add a person
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name,
    number
  })
  person.save().then(result => {
    mongoose.connection.close()
  })
// Display persons
} else if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}