
export const Header=(props)=>{
    return (
        <h1>{props.header}</h1>
    )
  }
  
  
  export const Parts=(props)=>{
    return(
       <p>{props.name}: {props.exercises}</p> 
    )
   
  }
  
  export const Content=(props)=>{
    const exercises=props.content.map((exercise)=>exercise.exercises)
    const total=exercises.reduce((s,p)=>s+p)
  
    return(
      
      <div>
      {props.content.map(part =>
        <Parts key={part.id} name={part.name} exercises={part.exercises} />
      )}
      total of exercises: {total}
      </div>
    )
  }
  