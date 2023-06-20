
const PersonForm = ({ addPerson, newPerson, handleChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input name="name" onChange={handleChange} value={newPerson.name}></input>
            </div>
            <div>
                number:<input number="number" onChange={handleChange} value={newPerson.number}></input>
            </div>
            <button type="submit">add</button>
        </form>
    )
}

export default PersonForm;