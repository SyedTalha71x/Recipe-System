import React, { useEffect, useContext, useState } from 'react'
import recipeContext from './Context/recipeContext'
import { CiEdit } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';

const Recipeitem = () => {
    const navigate = useNavigate();

    const context = useContext(recipeContext);
    const { userrecipes, fetchallrecipesbyuser, Deleterecipe, EditRecipe } = context;
    const [modelopen, setmodelopen] = useState(false);
    const [editrecipe, setEditRecipe] = useState(null);


    const ChangeHandle = (e) => {
        const { name, value } = e.target;
        setEditRecipe({ ...editrecipe, [name]: value })
    }

    const handleEditButton = (e) => {
        e.preventDefault();
        EditRecipe(editrecipe._id, editrecipe.name, editrecipe.state,
            editrecipe.category, editrecipe.ingredients, editrecipe.desc, editrecipe.cookTime);
        setmodelopen(false);
    }

    const EditRecipeOnce = (recipe) => {
        setEditRecipe(recipe);
        setmodelopen(true);
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchallrecipesbyuser();
        }
        else {
            navigate('/Login');
        }
    }, [])

    return (
        <section className="text-gray-900 body-font cursor-pointer w-[80%] mx-auto">
            {/* <h1 className='text-2xl text-black font-bold capitalize ml-10'>Your Recipes</h1> */}
            <div className="container px-5 py-24 mx-auto ">
                <div className="flex flex-wrap -m-4 ">
                    <div className='text-2xl font-bold'>
                        {userrecipes.length === 0 && 'No Recipes to Display'}
                    </div>
                    {userrecipes.map((recipe, index) => (
                        <div key={index} className="lg:w-1/4 md:w-1/2 p-6 w-full m-3 border-2 border-gray-500 bg-slate-100">
                            <a className="block relative h-48 rounded overflow-hidden">
                                <img alt="recipe" className="object-cover object-center w-full h-full block" src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                            </a>
                            <div className="mt-4">
                                <h3 className="text-gray-900 text-lg font-bold tracking-widest mb-1">{recipe.name}</h3>
                                <h2 className="text-gray-700 title-font text-sm font-medium"><span className='font-bold'>State:</span> {recipe.state}</h2>
                                <h2 className="text-gray-700 title-font text-sm font-medium"><span className='font-bold'>Category:</span> {recipe.category}</h2>
                                <h2 className="text-gray-700 title-font text-sm font-medium"><span className='font-bold'>Cooktime:</span> {recipe.cookTime}</h2>
                            </div>
                            <div className='flex justify-around items-center mt-5'>
                                <button className='bg-purple-600 text-white rounded-sm py-2 px-8 text-center' onClick={() => { EditRecipeOnce(recipe) }}>Edit</button>
                                <button className='bg-purple-600 ml-5 text-white rounded-sm py-2 px-8 text-center' onClick={() => { Deleterecipe(recipe._id) }}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {editrecipe && (
                <div className={`fixed z-10 inset-0 overflow-y-auto ${modelopen ? 'block' : 'hidden'}`}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg font-bold leading-6 text-gray-900">Update Recipe</h3>
                                        <div className="mt-2">
                                            <form onSubmit={handleEditButton}>
                                                <div className="flex flex-wrap -m-2">
                                                    <div className="p-2 w-full grid grid-cols-2 gap-4">
                                                        <div className="relative">
                                                            <input value={editrecipe.name} onChange={ChangeHandle} id="name" type='text' name="name" placeholder='Recipe Name' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" />
                                                        </div>
                                                        <div className="relative">
                                                            <input value={editrecipe.state} onChange={ChangeHandle} id="state" type='text' name="state" placeholder='Recipe State' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                                        </div>
                                                        <div className="relative">
                                                            <input value={editrecipe.category} onChange={ChangeHandle} id="category" type='text' name="category" placeholder='Recipe Category' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                                        </div>
                                                        <div className="relative">
                                                            <input value={editrecipe.cookTime} onChange={ChangeHandle} id="cookTime" type='text' name="cookTime" placeholder='Recipe Cooktime' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                                        </div>
                                                        <div className="relative">
                                                            <input value={editrecipe.ingredients} onChange={ChangeHandle} id="ingredients" type='text' name="ingredients" placeholder='Recipe Ingredients' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                                        </div>
                                                    </div>
                                                    <div className="relative w-full">
                                                        <textarea value={editrecipe.desc} onChange={ChangeHandle} rows={8} id="desc" name="desc" placeholder='Recipe Description' className="w-full outline-none bg-gray-100 bg-opacity-50 rounded border border-gray-300  text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                                    </div>
                                                    <div className="p-2 w-full flex justify-around items-center">
                                                        <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Update</button>
                                                        <button type="submit" className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" onClick={() => { setmodelopen(false) }}>Close</button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Recipeitem