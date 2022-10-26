/** @format */

var express = require("express");
var router = express.Router();
var User = require(`../models/User`);
/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// 1. Find all users who are active.

router.get(`/all/active`, (req, res, nex) => {
  User.aggregate([{ $match: { isActive: true } }]);
});

// 2. Find all users whose name includes `blake` case insensitive.

// 3. Find all males.

router.get(`/all/male`, async (req, res, nex) => {
  try {
    let male = await User.aggregate([{ $match: { gender: "male" } }]);
    res.send(male);
  } catch (error) {
    console.log(error);
  }
});

// 4. Find all active males.
router.get(`/active/male`, async (req, res, next) => {
  try {
    let activeMale = await User.aggregate([
      {
        $match: { isActive: true, gender: "male" },
      },
    ]);
    res.send(activeMale);
  } catch (error) {
    console.log(error);
  }
});

// 5. Find all active females whose age is >= 25.

router.get(`/active/females`, async (req, res, next) => {
  try {
    let females = await User.aggregate([
      {
        $match: { isActive: true, gender: "female", age: { $gt: 25 } },
      },
    ]);
    res.send(females);
  } catch (error) {
    console.log(error);
  }
});

// 6. Find all 40+ males with green eyecolor.

router.get(`/eye/green`, async (req, res, next) => {
  try {
    let eyeColors = await User.aggregate([
      {
        $match: { gender: "male", age: { $gt: 40 }, eyeColor: "green" },
      },
    ]);
    res.send(eyeColors);
  } catch (error) {
    console.log(error);
  }
});

// 7. Find all blue eyed men working in 'USA'.

router.get(`/blue/usa`, async (req, res, next) => {
  let usaMen = await User.aggregate([
    {
      $match: {
        gender: "male",
        eyeColor: "blue",
        "company.location.country": "USA",
      },
    },
  ]);
  res.send(usaMen);
});

// 8. Find all female working in Germany with green eyes and apple as favoriteFruit.

router.get(`/green/apple`, async (req, res, next) => {
  let females = await User.aggregate([
    {
      $match: {
        gender: "female",
        eyeColor: "green",
        favoriteFruit: "apple",
        "company.location.country": "Germany",
      },
    },
  ]);
  res.send(females);
});
// 9. Count total male and females.

router.get(`/count`, async (req, res, next) => {
  let count = await User.aggregate([
    {
      $group: { _id: "$gender", count: { $sum: 1 } },
    },
  ]);
  res.send(count);
});

// 10. Count all whose eyeColor is green.

router.get(`/count/green`, async (req, res, next) => {
  let count = await User.aggregate([
    {
      $match: { eyeColor: "green" },
    },
    {
      $group: { _id: "$eyeColor", count: { $sum: 1 } },
    },
  ]);
  res.send(count);
});

// 11. Count all 20+ females who have brown eyes.

router.get(`/count/brown`, async (req, res, next) => {
  let females = await User.aggregate([
    {
      $match: { eyeColor: "brown", age: { $gt: 20 } },
    },
    {
      $group: { _id: "$eyeColor", count: { $sum: 1 } },
    },
  ]);
  res.send(females);
});

// 12. Count all occurences of all eyeColors.
//     Something like:-

// ```
// blue -> 30
// brown -> 67
// green -> 123
// ```
router.get(`/count/eyeColor`, async (req, res, next) => {
  let count = await User.aggregate([
    {
      $group: { _id: "$eyeColor", count: { $sum: 1 } },
    },
  ]);
  res.send(count);
});

// 13. Count all females whose tags array include `amet` in it.

router.get(`/count/amet`, async (req, res, next) => {
  let count = await User.aggregate([
    {
      $match: { gender: "female" },
    },
    { $unwind: "$tags" },
    { $match: { tags: "amet" } },
    { $group: { _id: null, count: { $sum: 1 } } },
  ]);
  res.send(count);
});

// 14. Find the average age of entire collection

router.get(`/ave/age`, async (req, res, next) => {
  let age = await User.aggregate([
    {
      $group: { _id: null, average_age: { $avg: "$age" } },
    },
  ]);
  res.send(age);
});

// 15. Find the average age of males and females i.e. group them by gender.

router.get(`/ave/age/both`, async (req, res, next) => {
  let age = await User.aggregate([
    {
      $group: { _id: "$gender", average_age: { $avg: "$age" } },
    },
  ]);
  res.send(age);
});

// 16. Find the user with maximum age.

router.get(`/max/age/`, async (req, res, next) => {
  let age = await User.aggregate([
    { $group: { _id: null, max_age: { $max: "$age" } } },
  ]);
  res.send(age);
});

// 17. Find the document with minimum age.

router.get(`/min/age/`, async (req, res, next) => {
  let age = await User.aggregate([
    { $group: { _id: null, max_age: { $min: "$age" } } },
  ]);
  res.send(age);
});
// 18. Find the sum of ages of all males and females.

router.get(`/sum/age/`, async (req, res, next) => {
  let sumAge = await User.aggregate([
    { $group: { _id: "$gender", age_sum: { $sum: 1 } } },
  ]);
  res.send(sumAge);
});

// 19. Group all males by their eyeColor.
router.get(`/all/male/eyeColor`, async (req, res, next) => {
  let eyeColors = await User.aggregate([
    { $match: { gender: "male" } },
    { $group: { _id: "$eyeColor" } },
  ]);
  res.send(eyeColors);
});

// 20. group all 30+ females by their age.

router.get(`/all/female/age`, async (req, res, next) => {
  let females = await User.aggregate([
    { $match: { gender: "female", age: { $gt: 30 } } },
    { $group: { _id: "$age" } },
  ]);
  res.send(females);
});

// 21. Group all 23+ males with blue eyes working in Germany.

router.get(`/male/in/germany`, async (req, res, next) => {
  let maleInGermany = await User.aggregate([
    {
      $match: {
        gender: "male",
        age: { $gt: 23 },
        eyeColor: "blue",
        "company.location.country": "Germany",
      },
    },
  ]);
  res.send(maleInGermany);
});

// 22. Group all by tag names i.e. use \$unwind since tags are array.
router.get(`/tags`, async (req, res, next) => {
  let tagName = await User.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
  ]);
  res.send(tagName);
});
// 23. Group all males whose favoriteFruit is `banana` who have registered before 2015.

router.get(`/register`, async (req, res, next) => {
  let allMale = await User.aggregate([
    {
      $match: {
        gender: "male",
        favoriteFruit: "banana",
        registered: { $lt: new Date("2015-03-09T11:16:38Z") },
      },
    },
    { $group: { _id: "$registered", count: { $sum: 1 } } },
  ]);
  res.send(allMale);
});

// 24. Group all females by their favoriteFruit.

router.get(`/females`, async (req, res, next) => {
  let females = await User.aggregate([
    { $match: { gender: "female" } },
    { $group: { _id: "$favoriteFruit", count: { $sum: 1 } } },
  ]);
  res.send(females);
});

// 25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);

router.get(`/colors`, async (req, res, next) => {
  let colors = await User.find().distinct("eyeColor");
  res.send(colors);
});

// 26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.

router.get(`/femaleInUsa`, async (req, res, next) => {
  let femaleInUsa = await User.aggregate([
    {
      $match: {
        gender: "female",
        favoriteFruit: "apple",
        "company.location.country": "USA",
      },
    },
    { $sort: { registered: -1 } },
  ]);
  res.send(femaleInUsa);
});

// 27. Find all 18+ inactive men and return only the fields specified below in the below provided format

// {
//   name: "",
//   email: '';
//   identity: {
//     eye: '',
//     phone: '',
//     location: ''
//   }
// }

router.get(`/inactive/men`, async (req, res, next) => {
  let inactive = await User.aggregate([
    { $match: { gender: "male", age: { $gt: 18 }, isActive: false } },
    {
      $project: {
        name: 1,
        email: "$company.email",
        identity: {
          eye: "$eyeColor",
          phone: "$company.phone",
          location: "$company.location.country",
        },
      },
    },
  ]);
  res.send(inactive);
});
module.exports = router;
