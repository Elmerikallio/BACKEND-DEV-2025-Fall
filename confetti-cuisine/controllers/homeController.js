var courses = [
  {
    title: "Even Driven Cakes",
    cost: 50,
  },
  {
    title: "Asynchronous Artichoke",
    cost: 25,
  },
  {
    title: "Observable Oatmeal",
    cost: 10,
  },
];

const showCourses = (req, res) => {
  res.render("courses", {
    offeredCourses: courses,
  });
};

const showSignUp = (req, res) => {
  res.render("contact");
};

const postedSignUpForm = (req, res) => {
  console.log("Form Data:", req.body);
  res.render("thanks");
};

export const homeController = {
  showCourses,
  showSignUp,
  postedSignUpForm,
};
