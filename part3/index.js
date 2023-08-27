require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors=require('cors')
// const baseUrl='http://localhost:3001/api/notes'

const app = express()
let persons = [
  
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3, 
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.use(cors())
//To make express show static content, the page index.html and the JavaScript
app.use(express.static('build'))

const Person=require('./models/note')

/*===================数据库连接结束 ===================== */

//3.1 get请求获取所有联系人
app.get('/api/persons',(request,response)=>{

  Person.find({}).then(result => {
    response.json(result)
    console.log("Phonebook:")
    result.forEach(person => {
      console.log(`${person.name}: ${person.number}`)
    })
  })
})

//3.2 get请求获取总共多少人,请求时间
app.get('/info',(request,response)=>{
  const number=persons.length;
  const time=new Date().toLocaleString()
  response.send(`<div>phonebook has ${number} people</div> <div>the resonse time is ${time} </div>`)
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})


app.get('/api/persons/:id', (request, response) => {
Person.findById(request.params.id).then(person=> {

  if(person){
    response.json(person)
  }else{
    response.status(404).end()
  }
}).catch(error=>{
  console.log(error)
  response.status(500).end()
})
  
  // const id=Number(request.params.id)
  // const person=persons.find(person=>person.id===id);

})

//3.4 删除资源
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end( )
})

//3.5 使新的电话簿条目可以通过 HTTP POST 请求添加到地址,使用math random随机生成id
const u=app.use(morgan('tiny'))
app.post('/api/persons',(request,response)=>{
  const {name,number}=request.body;

  if(number===undefined){
    return response.status(400).json({error:'content missing'})
  }

  if(!name ||!number){
    response.send('name or number is required')
  }
  else if(persons.some(person=>person.name===name? true:false)===true){
    response.send('name duplicated')
  }

    const person=new Person({
      name:name,
      number:number
    })
  
    person.save().then(savedPerson=>{
      response.json(savedPerson)
      // mongoose.connection.close()
    })

})

//
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 