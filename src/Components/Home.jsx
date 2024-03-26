import React, { useContext, useEffect, useState } from 'react';
import RecipeContext from './Context/recipeContext';
import { Link } from 'react-router-dom';
import axios from 'axios';


const SearchResultsModal = ({ SearchResults, closemodal }) => {
    console.log(SearchResults);
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Search Results</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {SearchResults && SearchResults.length > 0 ? (
                                        SearchResults.map((recipe, index) => (
                                            <div key={index} className="p-4 border border-gray-200 rounded-md">
                                                <h3 className="text-lg font-semibold mb-2">{recipe.name}</h3>
                                                <p className="text-gray-600">State: {recipe.state}</p>
                                                <p className="text-gray-600">Category: {recipe.category}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No recipes found.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button onClick={closemodal} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Home = () => {
    const context = useContext(RecipeContext);
    const { recipes, fetchallrecipes } = context;
    const [SearchResults, setSearchResults] = useState([])
    const [cooktime, setcooktime] = useState(0)
    const [ismodalopen, setismodalopen] = useState(false)

    const BASE_URL = 'http://localhost:3001';

    useEffect(() => {
        fetchallrecipes();
    }, []);

    const submitHandle = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/recipe/SearchRecipebycookTime/${cooktime}`);
            console.log(response.data);
            setSearchResults(response.data);
            setismodalopen(true);
        } catch (error) {
            console.error('Error fetching recipes by cook time:', error);
        }
    };

    const closemodal = () => {
        setismodalopen(false);
    };


    return (
        <>
            <section className="w-[60%] m-auto mt-10 flex justify-end items-center">
                <div className="">
                    <input value={cooktime} onChange={(e) => setcooktime(e.target.value)} type="text" placeholder='Search' className='py-2 px-10 rounded-sm bg-slate-100' />
                    <button onClick={submitHandle} className='text-center  ml-2 bg-purple-600 text-white rounded-sm py-2 px-8'>
                        Search
                    </button>
                </div>
            </section>
            <section className="text-gray-600 body-font cursor-pointer mt-[5%]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {recipes.map((recipe, index) => (
                            <div key={index} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                                <Link to={`/Dynamicrecipe/${recipe.name}`}>
                                    <div className="block relative h-48 rounded overflow-hidden">
                                        <img alt="recipe" className="object-cover object-center w-full h-full block" src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-gray-900 text-lg font-bold tracking-widest mb-1">{recipe.name}</h3>
                                        <h2 className="text-gray-600 title-font text-sm font-medium">{recipe.state}</h2>
                                        <h2 className="text-gray-600 title-font text-sm font-medium">{recipe.category}</h2>
                                        {/* <h2 className="text-gray-600 title-font text-sm font-medium">{recipe.description}</h2> */}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section>
                {ismodalopen && <div>
                    <SearchResultsModal
                        SearchResults={SearchResults}
                        closemodal={closemodal}
                    />
                </div>}
            </section>
        </>
    );
};

export default Home;
