const express = require('express');
const router = express.Router();
const WebDev = require('../Models/WebDev');

router.get('/webdevs', (req, res, next) => {
  WebDev.find({}, (err, webdevList) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(webdevList);
    }
  });
});

router.post('/webdevs', (req, res, next) => {
  const newWebDev = new WebDev({
    title: req.body.title,
    text: req.body.text,
    image: req.body.image
  });

  newWebDev.save((err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ webdev: newWebDev });
    }
  });
});

router.get('/webdevs/:id', (req, res, next) => {
  const { id } = req.params;

  WebDev.findById(id, (err, webdev) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json(webdev);
    }
  });
});

router.put('/webdevs/:id', (req, res, next) => {
  const { id } = req.params;
  const webdevToUpdate = {
    title: req.body.title,
    text: req.body.text,
    image: req.body.image || '',
  };

  WebDev.findByIdAndUpdate(id, webdevToUpdate, (err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ message: 'updated' });
    }
  });
});

router.delete('/webdevs/:id', (req, res, next) => {
  const { id } = req.params;

  WebDev.remove({ _id: id }, (err) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ message: 'deleted' });
    }
  });
});


module.exports = router;
