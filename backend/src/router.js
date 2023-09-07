const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
  res.status(200).send('O Router esta funcionando');
});
module.exports = router;
