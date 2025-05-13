import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notificacion from './components/Notificacion'
import './index.css' // Asegúrate de importar el CSS

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p => p.name === newName)
    const person = { name: newName, number: newNumber }

    if (existingPerson && existingPerson.number === newNumber) {
      alert(`${person.name} ya está en la lista con el mismo número`)
      return
    }

    if (existingPerson && existingPerson.number !== newNumber) {
      if (window.confirm(`${person.name} ya está en la lista. ¿Deseas actualizar el número?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber }

        personService
          .update(existingPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== existingPerson.id ? p : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessage({ text: `Número actualizado para ${person.name}`, isError: false })
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(error => {
            const errorMsg = error.response?.data?.error || `La persona '${person.name}' ya fue eliminada del servidor.`
            setMessage({ text: errorMsg, isError: true })
            setPersons(persons.filter(p => p.id !== existingPerson.id))
            setTimeout(() => setMessage(null), 5000)
          })
      }
      return
    }

    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({ text: `Agregado ${person.name}`, isError: false })
        setTimeout(() => setMessage(null), 5000)
      })
      .catch(error => {
        const errorMsg = error.response?.data?.error || 'Error al agregar la persona'
        setMessage({ text: errorMsg, isError: true })
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const handlePerson = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilter(event.target.value)

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleDeletePerson = (id) => {
    const persona = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${persona.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage({ text: `Eliminado ${persona.name}`, isError: false })
          setTimeout(() => setMessage(null), 5000)
        })
        .catch(error => {
          setMessage({ text: `La persona '${persona.name}' ya fue eliminada del servidor.`, isError: true })
          setPersons(persons.filter(p => p.id !== id))
          setTimeout(() => setMessage(null), 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilter={handleFilter} />

      <Notificacion message={message} />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePerson={handlePerson}
        newNumber={newNumber}
        handleNumber={handleNumber}
      />

      <h2>Numbers</h2>

      <Persons persons={filteredPersons} btnEliminar={handleDeletePerson} />
    </div>
  )
}

// Subcomponentes

const Persons = ({ persons, btnEliminar }) => (
  <div>
    {persons.map(person => (
      <p key={person.id}>
        <b>{person.name}</b> <b>{person.number}</b>{' '}
        <BotonEliminar btnEliminar={() => btnEliminar(person.id)} />
      </p>
    ))}
  </div>
)

const BotonEliminar = ({ btnEliminar }) => (
  <button onClick={btnEliminar}>eliminar</button>
)

const Filter = ({ handleFilter }) => (
  <div>
    filter shown with <input onChange={handleFilter} />
  </div>
)

const PersonForm = ({ addPerson, newName, handlePerson, newNumber, handleNumber }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handlePerson} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default App
