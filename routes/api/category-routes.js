const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
  const dbCategories = await Category.findAll({
    include: [{model: Product}]
  });

  res.status(200).json(dbCategories);
} catch (err) {
  res.status(500).json(err)
}
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try{
   const categoryData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    if(!categoryData) {
      res.status(404).json({message: 'No Category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  const newCategory = await Category.create({
    category_id: req.body.category_id
  });
  res.status(200).json(newCategory)
  } catch (err) {
  res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update({
      where: {
        id: req.params.id
      }
    })
    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData)

  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      },
    });

    if(!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData)

  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
