const router = require('express').Router();
const reddit = require('../reddit/app');
module.exports = router;

router.use('/users', require('./users'));

router.use('/reddit', async (req, res, next) => {
  try {
    console.log('req.body is', req.body);
    // const redditCreator = reddit.bind({ ...req.body });
    // const myReddit = { ...reddit };
    // console.log('myreddit is', myReddit);
    // res.send('Done');
    const accountData = { ...req.body };
    const createdAccounts = await reddit(accountData);
    // let createdAccounts = await redditCreator({ ...req.body });
    res.json(createdAccounts);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
