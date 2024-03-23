const Recipe = require('../Models/Recipe');
const Review = require('../Models/CustomerReview');
const Comments = require('../Models/UserComments');
const Fetchuser = require('../Middleware/adminuser');
const express = require('express');
const router = express.Router();

router.get('/fetchallrecipies', Fetchuser, async (req, res) => {
    try {
        const fetchrecipies = await Recipe.find({ user: req.user.id }).sort({ _id: -1 });
        res.status(200).json(fetchrecipies);
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Error' })
    }
})

router.get('/fetchallrecipiesdefault', async (req, res) => {
    try {
        const fetchrecipies = await Recipe.find().sort({ _id: -1 });
        res.status(200).json(fetchrecipies);
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Error' })
    }
})


router.post('/addrecipe', Fetchuser, async (req, res) => {
    const { name, state, category, ingredients, desc, cookTime } = req.body;
    try {
        let addRecipe = new Recipe({
            name, state, category, ingredients, desc, cookTime, user: req.user.id
        })
        await addRecipe.save();
        res.status(200).json({ message: 'Recipes had been added', addRecipe })
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Sorry to Add Recipie' })
    }
})


router.put('/updaterecipe/:id', Fetchuser, async (req, res) => {
    const { name, state, category, cookTime, ingredients, desc } = req.body;
    // const recipeName = req.params.name;

    try {
        let recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(401).json({ message: 'Sorry you cannot access another person features' })
        }
        let newRecipes = {};
        if (name) { newRecipes.name = name; }
        if (state) { newRecipes.state = state; }
        if (category) { newRecipes.category = category; }
        if (cookTime) { newRecipes.cookTime = cookTime; }
        if (ingredients) { newRecipes.ingredients = ingredients; }
        if (desc) { newRecipes.desc = desc; }

        recipe = await Recipe.findByIdAndUpdate(req.params.id, { $set: newRecipes }, { new: true });
        res.status(200).json(recipe);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error' });
    }
});


router.delete('/deleterecipe/:id', async (req, res) => {
    // const recipieName = req.params.name
    try {
        let deleteRecipie = await Recipe.findById(req.params.id);
        if (!deleteRecipie) {
            return res.status(401).json({ message: 'Sorry you cannot access another person features' })
        }

        deleteRecipie = await Recipe.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Recipe has been deleted', deleteRecipie });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Failed to delete Recipe' })
    }
})

router.get('/SearchRecipebycookTime/:cooktime', async (req, res) => {
    try {
        const newcooktime = req.params.cooktime;
        const searchRecipie = await Recipe.find({ cookTime: newcooktime });

        if (searchRecipie.length === 0) {
            return res.status(400).json({ message: 'Recipe not found in the database' })
        }
        res.status(200).json({ message: 'Successfully founded your Recipie', searchRecipie });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Failed to Search By Cooktime' })

    }
})

router.get('/fetchrecipesbyIng/:ingredients', async (req, res) => {
    try {
        const ingredients = req.params.ingredients.split(',');
        const fetchByIng = await Recipe.find({ ingredients: { $in: ingredients } });
        if (fetchByIng.length === 0) {
            return res.status(400).json({ message: 'Recipe not found in the database' })
        }
        res.status(200).json({ message: 'Found', recipes: fetchByIng });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed' })
    }
});

router.get('/fetchbypagination/:skipRecipes/:limitRecipes', async (req, res) => {
    try {
        const skipRecipes = req.params.skipRecipes;
        const limitRecipes = req.params.limitRecipes;
        const fetchRecipesByPagination = await Recipe.find().skip(skipRecipes).limit(limitRecipes);
        res.status(200).json(fetchRecipesByPagination);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error' });
    }
})


router.post('/addreviews/:recipe_ID', async (req, res) => {
    const { customer_id, text, time, stars } = req.body;
    try {
        const recipe_ID = req.params.recipe_ID;
        const addReview = new Review({
            customer_id,
            text,
            time,
            stars,
            recipe_id: recipe_ID
        })
        await addReview.save();
        res.status(200).json({ message: 'Review has been added', addReview })
    }

    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Error' });
    }
})

router.get('/fetchrecipereview/:recipe_ID/:skipRecipes/:limitRecipes', async (req, res) => {
    try {
        const recipe_ID = req.params.recipe_ID;
        const skipRecipes = req.params.skipRecipes;
        const limitRecipes = req.params.limitRecipes;
        const fetchRecipes = await Review.find({ recipe_id: recipe_ID }).skip(skipRecipes).limit(limitRecipes);
        res.status(200).json(fetchRecipes);
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Error' });
    }
});

router.get('/fetchReviewonRating/:recipe_ID', async (req, res) => {
    try {
        const recipe_ID = req.params.recipe_ID;
        const review = await Review.find({ recipe_id: recipe_ID });

        let overallstars = 0;
        for (let x = 0; x < review.length; x++) {
            overallstars += review[x].stars
        }
        const rating = overallstars / review.length;
        res.status(200).json({ message: 'Reviews of this Recipe is ', rating });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error' });
    }
})

router.post('/addcomment/:recipe_ID', async (req, res) => {
    const { name, text, date } = req.body;
    const recipe_ID = req.params.recipe_ID;

    try {
        const recipe = await Recipe.findById(recipe_ID);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        const parseddate = date || Date.now();
        const addcomment = new Comments({
            name,
            text,
            date: parseddate,
            recipe_id: recipe_ID,
        });
        await addcomment.save();
        res.status(200).json({ message: 'Comment has been added', addcomment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/fetchallcommentsbyuser/:name', async (req, res) => {
    const newName = req.params.name;
    try {
        const fetched = await Comments.find({ name: newName });
        if (fetched.length === 0) {
            return res.status(401).json({ message: 'Sorry you cannot access another individual' })
        }
        res.status(200).json(fetched);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

router.put('/updatecomments/:id', async (req, res) => {
    const { name, text, date } = req.body;
    try {
        let newComments = {};
        if (name) { newComments.name = name; }
        if (text) { newComments.text = text; }
        if (date) { newComments.date = date; }

        const update = await Comments.findByIdAndUpdate(req.params.id, { $set: newComments }, { new: true });
        if (!update) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(update);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/fetchallcomments', async (req, res) => {
    try {
        const fetchall = await Comments.find().sort({ _id: -1 });
        res.status(200).json({ message: 'Fetched All Comments', fetchall });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error' });
    }
})
module.exports = router
