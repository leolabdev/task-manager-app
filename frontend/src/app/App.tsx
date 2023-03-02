import {useState} from 'react'
import {Button, ButtonTheme} from "@/shared/ui/Button/Button";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
        test
        <Button theme={ButtonTheme.OUTLINE}/>
    </div>
  )
}




export default App
