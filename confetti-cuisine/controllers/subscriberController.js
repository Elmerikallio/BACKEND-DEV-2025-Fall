import Subscriber from "../models/subscriber.js";

// get all subscribers and render the subscribers page
export const getAllSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find({}).lean();
    res.render("subscribers", { subscribers });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

//Render subscribtion pahe
export const getSubscriptionPage = (req, res) => {
  res.render("contact");
};

export const saveSubscriber = async (req, res, next) => {
  try {
    const { name, email, zipCode, streetAddress, vip } = req.body;

    const newSubscriber = new Subscriber({
      name,
      email,
      zipCode,
      streetAddress,
      vip: Boolean(vip),
    });

    await newSubscriber.save();
    res.render("thanks");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const subscriberController = {
  getAllSubscribers,
  getSubscriptionPage,
  saveSubscriber,
};
