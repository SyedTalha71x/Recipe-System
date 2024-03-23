import './App.css'
import Navbar from './Components/Navbar'
import Login from './Components/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Recipe from './Components/Recipe';
import RecipeState from './Components/Context/RecipeState';
import Home from './Components/Home';
import DynamicRecipe from './Components/DynamicRecipe';

function App() {
  return (
    <>
      <RecipeState>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/recipe' element={<Recipe />} />
            <Route path='/DynamicRecipe/:name' element={<DynamicRecipe />} />
          </Routes>
        </Router>
      </RecipeState>
    </>
  )
}

export default App
