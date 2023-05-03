import './App.css'
import ChattingWrapper from './components/chatting-rooms/ChattingWrapper'
import SceneWrapper from './components/scenes/SceneWrapper'

function App() {

  return (
    <div id="App">
      <div id="chatting-room">
        <ChattingWrapper />
      </div>
      <div id="scene-wrapper">
        <SceneWrapper />
      </div>
    </div>
  )
}

export default App
