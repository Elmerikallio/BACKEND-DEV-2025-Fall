import Subscriber from "../models/subscriber.js";

const getSubscriberParams = (body) => {
  return {
    name: body.name,
    email: body.email,
    zipCode: body.zipCode,
    streetAddress: body.streetAddress,
    vip: body.vip === "on",
  };
};

// function to fetch all subs from the db
// using Model and .find method
const index = (req, res, next) => {
  Subscriber.find()
    .then((subscribers) => {
      res.locals.subscribers = subscribers;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching subscribers: ${error.message}`);
      next(error);
    });
};

// fucntion to render the subscriber index view
const indexView = (req, res) => {
  res.render("subscribers/index", {
    subscribers: res.locals.subscribers,
  });
};

// function to create a new subscriber
const create = (req, res, next) => {
  const subscriberParams = getSubscriberParams(req.body);
  // calling Subscriber model wiht create methd and passing the subscriber params for it
  // after creation redirecting to subsciber page
  Subscriber.create(subscriberParams)
    .then((subscriber) => {
      res.locals.redirect = "/subscribers";
      res.locals.subscriber = subscriber;
      next();
    })
    .catch((error) => {
      console.log(`Error saving subscriber: ${error.message}`);
      next(error);
    });
};

// fucntion the render creation view of subscribers
const newView = (req, res) => {
  res.render("subscribers/new");
};

// function to redirect to the correct view
const redirectView = (req, res, next) => {
  const redirectPath = res.locals.redirect;
  if (redirectPath) res.redirect;
  else next();
};

// function to fetch a single subscriber by their ID
const show = (req, res, next) => {
  // assigning id from URL parameters to a variable
  const subsciberId = req.params.id;
  // fetching a single subscriber with their ID using Subscriber model and findByID method
  Subscriber.findById(subsciberId)
    .then((subscriber) => {
      res.locals.subscriber = subscriber;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching subscriber: ${error.message}`);
      next(error);
    });
};

// function for rendering the show view
const showView = (req, res) => {
  res.render("subscribers/show");
};

// function for rendering an existing subscriber by their ID
const edit = (req, res, next) => {
  // assigning id from URL params to a variable
  const subsciberId = req.params.id;
  // fetching a subscriber with their ID using Subscriber model and findByID method
  Subscriber.findById(subsciberId)
    .then((subscriber) => {
      // rendering edit view and passing the found subscriber to it
      res.render("subscribers/edit", {
        subscriber: subscriber,
      });
    })
    .catch((error) => {
      console.log(`Error fetching subscriber: ${error.message}`);
      next(error);
    });
};

// function to update an existing subscriber by their ID
const update = (req, res, next) => {
  // assigning id from URL params to a variable
  const subsciberId = req.params.id;
  // assigning the values from request body to subscriberParams object (name, email, zipCode)
  const subscriberParams = getSubscriberParams(req.body);

  // update subscriber using Subscriber model and findByIDAndUpdate method
  // setting the values to be the ones from subscriberParams object instead
  Subscriber.findByIdAndUpdate(subscriberId, {
    $set: subscriberParams,
  })
    .then((subscriber) => {
      // redirecting to the individual subscriber view
      res.locals.redirect(`/subscribers/${subscriber._id}`);
      res.locals.subscriber = subscriber;
      next();
    })
    .catch((error) => {
      console.log(`Error updating subscriber: ${error.message}`);
      next(error);
    });
};

// function to delete an existing subscriber
const deleteSubscriber = (req, res, next) => {
  // assigning subscribers id from URL params to a variable
  const subscriberID = req.params.id;

  // deleting a subscriber using Subscriber omdel and findByIdAndDelete method
  Subscriber.findByIdAndDelete(subscriberId)
    .then(() => {
      // redirecting to the subscribers page after deletion
      res.locals.redirect = "/subscribers";
      next();
    })
    .catch((error) => {
      console.log(`Error deleting subscriber: ${error.message}`);
      next();
    });
};

export const subscriberController = {
  create,
  deleteSubscriber,
  edit,
  index,
  indexView,
  show,
  showView,
  update,
  newView,
  redirectView,
};
