import {Routes, Route} from 'react-router-dom'
import CreateCharacter from './components/CreateCharacter'
import NavigationBar from './components/NavigationBar'
import NotFound from './components/NotFound'
import ViewCharacters from './components/ViewCharacters'
import Home from './components/Home'
import CharacterDetails from './components/CharacterDetails'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return(
     <div className="page">

        <NavigationBar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/createcharacter" element={<CreateCharacter/>}/>
            <Route path="/viewcharacter" element={<ViewCharacters/>}/>
            <Route path="/notfound" element={<NotFound/>}/>
            <Route path="/characters/:id" element={<CharacterDetails/>}/>
        </Routes>
      
        </div>
  )
}

export default App


