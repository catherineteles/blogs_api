const blogPostService = require('../services/blogPostService');
const authService = require('../services/authService');

const { validateBody } = require('../services/blogPostService');
const categoryService = require('../services/categoryService');

const blogPostController = {
    addNew: async (req, res) => {
        const { title, content, categoryIds } = req.body;
        const { authorization } = req.headers;
        validateBody({ title, content, categoryIds });
        await Promise.all(categoryIds.map((id) => (
            categoryService.exists(id)
        )));

        const dataToken = authService.validateToken(authorization);
        const userId = dataToken.data.id;

        const post = await blogPostService.create({ title, content, categoryIds, userId });
        return res.status(201).json(post);
    },

    list: async (req, res) => {
        const blogPosts = await blogPostService.list();
        
        res.status(200).json(blogPosts);
    },

    findById: async (req, res) => {
        const id = await blogPostService.checkIfExists(req.params.id);
        const post = await blogPostService.findById(id);
    
        res.status(200).json(post);
    },

    updatePost: async (req, res) => {
        const id = await blogPostService.checkIfExists(req.params.id);
        const { authorization } = req.headers;
        const { data } = authService.validateToken(authorization);
        await blogPostService.verifyUser(id, data.id);
        const { title, content } = req.body;
        await blogPostService.validateUpdate({ title, content });
        await blogPostService.updatePost({ id, title, content });
        const post = await blogPostService.findById(id);
        
        res.status(200).json(post);
    },
    
    deletePost: async (req, res) => {
        const id = await blogPostService.checkIfExists(req.params.id);
        const { authorization } = req.headers;
        const { data } = authService.validateToken(authorization);
        await blogPostService.verifyUser(id, data.id);
        await blogPostService.deletePost(id);

        res.status(204).json();
    },
};

module.exports = blogPostController;