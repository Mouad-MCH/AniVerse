import { useLocalStorage } from "../hooks/useLocalStorage"



const Counter = () => {

    const { getValue, setValue } = useLocalStorage();

  return (
    <div>
      <input type='text' />
      <p>{getValue}</p>
      <button >add</button>
    </div>
  )
}

export default Counter
