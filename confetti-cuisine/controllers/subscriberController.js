import Subscriber from "../models/subscriber.js";

// get all subscribers and render the subscribers page

const getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .exec()
    .then((subscribers) => {
      res.render("subscribe", {
        subscribers: subscribers,
      });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    });
};

//Render subscribtion pahe

const getSubscriptionPage = (req, res) => {
  res.render("contact");
};

const saveSubscriber = (req, res) => {
  let newSubscriber = new subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode,
    streetAddress: req.body.streetAddress,
    vip: req.body.vip,
  });

  newSubscriber
    .save()
    .then(() => {
      res.render("thanks");
    })
    .catch((error) => {
      res.send(error);
    });
};

export const subscriberController = {
  getAllSubscribers,
  getSubscriptionPage,
  saveSubscriber,
};
