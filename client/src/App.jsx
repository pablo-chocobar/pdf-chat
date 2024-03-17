import './App.css'
import FileFormContainer from './components/FileFormContainer'
import ChatForm from './components/ChatForm'
import { useState } from 'react';

function App() {
  const [hideInput, setHideInput] = useState(false);

  return (
    <>

      {!hideInput && <FileFormContainer hideInput={hideInput} setHideInput={setHideInput}></FileFormContainer>
      }
      {hideInput && <ChatForm></ChatForm>
      }
    </>
  )
}

export default App
