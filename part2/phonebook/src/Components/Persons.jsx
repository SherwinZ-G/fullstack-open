const Persons = ({ personstoShow,deletePerson }) => {
    return (
        <div>
            {personstoShow.map(person => (
                <div key={person.name}> {person.name}:{person.number}
                    <button onClick={deletePerson}>delete</button>
                </div>
        ))}
        </div>
    )
}

export default Persons;