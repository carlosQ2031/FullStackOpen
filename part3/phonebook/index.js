const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')


app.use(express.json());
app.use(cors())
app.use(express.static('dist'))
app.use(morgan('tiny'))



morgan.token('body',(req)=>{
  return req.method === 'POST' && req.body && Object.keys(req.body).length ? JSON.stringify(req.body) : ''
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



const PORT = process.env.PORT || 3001;


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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

//Devuelve todos los contactos
app.get('/api/persons',(req,res)=>{
    res.json(persons)
})

//Devuelve una persona en especifico
app.get('/api/persons/:id',(req,res)=>{
  const id = Number(req.params.id)
  const person = persons.find(p=>p.id ===id)
  if(person){
    res.json(person)
  }else{
    res.status(404).end()
  }
})

//Elimina una persona 
app.delete('/api/persons/:id',(req,res)=>{
  const id = Number(req.params.id)
  persons = persons.filter(p=>p.id !== id)
  res.status(204).end()
})

//Agrega una persona
app.post('/api/persons', (req, res) => {
  const person = req.body;

  // Validar que se haya enviado nombre y número
  if (!person.name || !person.number) {
    return res.status(400).json({ error: 'name or number is missing' });
  }

  // Validar que el nombre no esté repetido
  const existPerson = persons.find(p => p.name === person.name);
  if (existPerson) {
    return res.status(400).json({ error: 'name must be unique' });
  }

  // Crear nuevo contacto con ID aleatorio
  const newPerson = {
    ...person,
    id: Math.floor(Math.random() * 1000000),
  };

  persons = [...persons, newPerson];
  res.status(201).json(newPerson);
});


//Devuelve la informacion
app.get('/info',(req,res)=>{
    res.send(`
        <p>Phone book has info for ${persons.length} people</p>
        <p>${new Date()}</p>
        `)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)



app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})