const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ["id","product_name","price","stock",]

      }
    ]
  }).then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', ({body}, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Post.findOne({
    where: {
      id: body.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
    ]
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', ({body}, res) => {
  // create a new category
  Category.create({
    title: body.title
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value 
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
