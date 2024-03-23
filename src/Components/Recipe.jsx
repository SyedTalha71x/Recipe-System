import React, { useContext, useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import recipeContext from './Context/recipeContext';
import Recipeitem from './Recipeitem';

const Recipe = () => {

    

    const [name, setname] = useState('')
    const [state, setstate] = useState('')
    const [category, setcategory] = useState('')
    const [cookTime, setcookTime] = useState(0)
    const [ingredients, setingredients] = useState('')
    const [desc, setdesc] = useState('')

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setname(e.target.value);
        }
        else if (e.target.name === 'state') {
            setstate(e.target.value);
        }
        else if (e.target.name === 'category') {
            setcategory(e.target.value);
        }
        else if (e.target.name === 'cookTime') {
            setcookTime(e.target.value);
        }
        else if (e.target.name === 'ingredients') {
            setingredients(e.target.value);
        }
        else if (e.target.name === 'desc') {
            setdesc(e.target.value);
        }
    }

    const context = useContext(recipeContext);
    const { AddRecipes } = context;

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            AddRecipes(name, state, category, ingredients.split(',').map(item => item.trim()), desc, parseInt(cookTime));
            alert('Recipes has been Added');
            setname('');
            setstate('');
            setcategory('');
            setcookTime('');
            setingredients('');
            setdescription('');
        }
        catch (error) {
            alert('Failed to Add Recipe');
            console.log(error);
        }
    }

    return (
        <>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-900">Add Your Recipe</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    <div className="lg:w-[80%] md:w-2/3 mx-auto">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="flex flex-wrap -m-2">
                                <div className="p-2 w-full grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input value={name} onChange={handleChange} id="name" type='text' name="name" placeholder='Recipe Name' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                    </div>
                                    <div className="relative">
                                        <input value={state} onChange={handleChange} id="state" type='text' name="state" placeholder='Recipe State' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                    </div>
                                    <div className="relative">
                                        <input value={category} onChange={handleChange} id="category" type='text' name="category" placeholder='Recipe Category' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                    </div>
                                    <div className="relative">
                                        <input value={cookTime} onChange={handleChange} id="cookTime" type='text' name="cookTime" placeholder='Recipe Cooktime' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                    </div>
                                    <div className="relative">
                                        <input value={ingredients} onChange={handleChange} id="ingredients" type='text' name="ingredients" placeholder='Recipe Ingredients' className="w-full mb-4 bg-gray-100 outline-none bg-opacity-50 rounded border border-gray-300 text-gray-700 py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></input>
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <textarea value={desc} onChange={handleChange} rows={8} id="desc" name="desc" placeholder='Recipe Description' className="w-full outline-none bg-gray-100 bg-opacity-50 rounded border border-gray-300  text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                </div>
                                <div className="p-2 w-full">
                                    <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"><CiCirclePlus className='text-3xl ' /></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Recipeitem />
        </>
    )
}

export default Recipe