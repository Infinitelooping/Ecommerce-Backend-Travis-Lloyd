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
  Category.findOne({
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
    category_name: body.category_name
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', ({body}, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: body.category_name
    },
    {
      where: {
        id: body.id
      }
    }
  ).then(dbData => {
    if (!dbData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(dbData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  }); 
});

router.delete('/:id', ({body}, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: body.id
    }
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
