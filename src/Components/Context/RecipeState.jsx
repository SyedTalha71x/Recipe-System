import React, { useState } from 'react'
import RecipeContext from './recipeContext';

const RecipeState = (props) => {

    const BASE_URL = 'http://localhost:3001'
    const [recipes, setrecipes] = useState([])
    const [userrecipes, setuserrecipes] = useState([])
    const [searchResults, setSearchResults] = useState([]);

    const fetchallrecipes = async () => {
        let url = `${BASE_URL}/api/recipe/fetchallrecipiesdefault`;
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const result = await res.json();
            setrecipes(result);
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchallrecipesbyuser = async () => {
        let url = `${BASE_URL}/api/recipe/fetchallrecipies`;
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            const result = await res.json();
            setuserrecipes(result);
        }
        catch (error) {
            console.log(error)
        }
    }

    const AddRecipes = async (name, state, category, ingredients, desc, cookTime) => {
        let url = `${BASE_URL}/api/recipe/addrecipe`
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ name, state, category, ingredients, desc, cookTime })
            })
            const result = await res.json();
            setrecipes(recipes.concat(result));
        }
        catch (error) {
            console.log(error);
        }
    }

    const Deleterecipe = async (id) => {
        let url = `${BASE_URL}/api/recipe/deleterecipe/${id}`
        try {
            const res = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            })
            await res.json();
            const newRecipes = userrecipes.filter((item) => { return item._id !== id });
            setuserrecipes(newRecipes);
        }
        catch (error) {
            console.log(error);
        }
    }

    const EditRecipe = async (id, name, state, category, ingredients, desc, cookTime) => {
        let url = `${BASE_URL}/api/recipe/updaterecipe/${id}`
        try {
            const res = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ id, name, state, category, ingredients, desc, cookTime })
            })
            await res.json();
            let updateRecipe = JSON.parse(JSON.stringify(userrecipes));
            for (let index = 0; index < updateRecipe.length; index++) {
                const element = updateRecipe[index];
                if (element._id === id) {
                    updateRecipe[index].name = name;
                    updateRecipe[index].state = state;
                    updateRecipe[index].category = category;
                    updateRecipe[index].ingredients = ingredients;
                    updateRecipe[index].desc = desc;
                    updateRecipe[index].cookTime = cookTime;
                    break;
                }
            }
            setuserrecipes(updateRecipe);

        }
        catch (error) {
            console.log(error);

        }
    }

    // const fetchByCookTime = async (cookTime) => {
    //     try {
    //         const res = await fetch(`${BASE_URL}/api/recipe/SearchRecipebycookTime/${cookTime}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         const data = await res.json();
    //         console.log(searchResults);
    //         setSearchResults(data);
    //     } catch (error) {
    //         console.error('Error fetching recipes by cook time:', error);
    //     }
    // }




    return (
        <RecipeContext.Provider value={{
            recipes, fetchallrecipes, AddRecipes, userrecipes, fetchallrecipesbyuser, Deleterecipe, EditRecipe
        }}>
            {props.children}
        </RecipeContext.Provider>
    )
}
export default RecipeState