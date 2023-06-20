import { useState } from 'react'
import PersonForm from './Components/PersonForm'
import Search from './Components/Search'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newPerson,setNewPerson]=useState({name:"",number:""})
  const [newName, setNewName] = useState('')
  const [filter,setFilter]=useState('')
  const [number, setNumber]=useState('')
  const [personstoShow,setPersonstoShow]=useState(persons)

//filter
  const filterBySearch=(e)=> {
    const search = e.target.value;
    setFilter(search);
    setPersonstoShow(persons.filter((person)=>person.name.includes(search)))
  }

//listen to names input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewPerson({ ...newPerson, [name]: value });
  };
//delete person
  const deletePerson = (name) => {
    const updatedPersons = persons.filter((person) => person.name !== name);
    setPersons(updatedPersons);
    setPersonstoShow(updatedPersons);
  };


  // add person
  const addPerson = (event) => { 
    event.preventDefault();
    const newPerson = { name: newName,phone:number }
    const check = persons.some(person => person.name === newName) ? true : false;
    if (check) {
      alert('person already exists!');
      setNewName('');
    } else {
      setPersons([...persons, newPerson]);
      setNewName('');
    } 

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filter={ filter} filterBySearch={filterBySearch} />
      <PersonForm addPerson={addPerson} newPerson={ newPerson} handleChange={handleChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons personstoShow={personstoShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App