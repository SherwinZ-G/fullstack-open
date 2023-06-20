const Search = ({ filter,filterBySearch }) => {
    return (
        <div>
            search: <input value={ filter} onChange={filterBySearch} />
        </div>
    )
}

export default Search;