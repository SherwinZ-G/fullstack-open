import { useState,useEffect } from 'react'
import axios from 'axios';
import Notifiacation from './Notification';


const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber]=useState('')
  const [filterName,setFilterName]=useState('')
  const[nMessage,setNmessage]=useState(null)
  const baseUrl = '/api/persons' 

  useEffect(()=>{
    axios.get(baseUrl)
      .then(response=>{
        const data=response.data;
        console.log(data)
        setPersons(data)
      }).catch(err=>{
        console.log('error')
      })

      
  },[]
  )
  
  const handleChange=(e)=>{
      setNewName(e.target.value)
  }

  const handleChangeNumber=(e)=>{
    setNewNumber(e.target.value)
}

const handleFilter=(e)=>{
  setFilterName(e.target.value)
}

const handleDelete=(id)=>{
  if(window.confirm('delete person?')){
    axios
    .delete(`http://localhost:3001/api/persons/${id}`)
    .then(response => {
      console.log(response)
      setPersons(persons.filter(person => person.id !== id));
    })
    
  }

}
  const filteredPersons=persons.filter(person=>person.name.toLowerCase().includes(filterName.toLowerCase()))

  const handleFormSubmit=(event)=>{
    event.preventDefault();
    const existingPerson=persons.find(person=>person.name===newName)
    if(existingPerson){
      if(window.confirm((`this name ${newName} has already exist,do you want to update the number?`))){
        const updatedPerson = { ...existingPerson, number: newNumber };

        axios
          .put(`/api/persons/${existingPerson.id}`, updatedPerson)
          .then((response) => {
            console.log('Person updated:', response.data);
  
            // Update the persons state with the updated person
            const updatedPersons = persons.map((person) =>
              person.id === existingPerson.id ? response.data : person
            )
            setPersons(updatedPersons);
      }
        ).catch(err=>{
          setNmessage(`this person does not exist!`)
          setPersons(persons.filter(person => person.id !== existingPerson.id));
          setTimeout(()=>{
            setNmessage(null)
          },5000)
        });
    } }else if(!newName || !newNumber){
      alert(`name or number can not be empty`)
    }else{
      setPersons([...persons,{name:newName,number:newNumber}])
      const newPerson={name:newName,number:newNumber}
      axios
      .post('/api/persons', newPerson)
      .then(response => {
        console.log(response)
        setNmessage(`${newName} is successfully added to the phone book`)
        setTimeout(()=>{
          setNmessage(null)
        },5000)
      }).catch(err=>{
        setNmessage(`this person does not exist!`)
        setTimeout(()=>{
          setNmessage(null)
        },5000)
      })
    }

    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <Notifiacation message={nMessage}/>
      <h2>Phonebook</h2>
      <div>search for people: <input value={filterName} onChange={handleFilter}/></div>
      <h2>Add New Contact</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleChangeNumber}/>
        </div>
        <div>
          <button type="submit" onClick={handleFormSubmit}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>{filteredPersons.map(person=> <li key={person.name}>{person.name}:{person.number} <button onClick={()=>handleDelete(person.id)}>delete</button></li>)}</ul>
    </div>
  )
}

export default App