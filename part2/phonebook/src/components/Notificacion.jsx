const Notificacion = ({ message }) => {
    if (!message) return null
  
    const className = message.isError ? 'error' : 'notification'
  
    return <div className={className}>{message.text}</div>
  }
  
  export default Notificacion
  