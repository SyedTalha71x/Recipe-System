import React, { useContext, useEffect } from 'react';
import RecipeContext from './Context/recipeContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const context = useContext(RecipeContext);
    const { recipes, fetchallrecipes } = context;

    useEffect(() => {
        fetchallrecipes();
    }, []);

    return (
        <>
            {/* <section>
                <img className='h-full w-full' src="https://images.pexels.com/photos/239581/pexels-photo-239581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
            </section> */}
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
        </>
    );
};

export default Home;
