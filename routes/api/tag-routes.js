const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
  
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try{
    const tagData = await Tag.findByPk(req.params.id, {
       include: [{model: Product}]
     });
     if(!categoryData) {
       res.status(404).json({message: 'No Tag found with that id!'});
       return;
     }
     res.status(200).json(tagData);
   } catch (err) {
     res.status(500).json(err)
   }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_id: req.body.tag_id
    });
    res.status(200).json(tagData)
    } catch (err) {
    res.status(400).json(err)
    }
  

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
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

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
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
