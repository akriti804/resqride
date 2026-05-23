import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const getSubscriptionPlans = () => {
  return axios.get(`${API_BASE_URL}/mechanic/subscriptions/plans`);
};

export const buySubscriptionPlan = (mechanicId, planName) => {
  return axios.post(`${API_BASE_URL}/mechanic/subscriptions/buy`, {
    mechanicId,
    planName,
  });
};

export const getFeaturedPlans = () => {
  return axios.get(`${API_BASE_URL}/mechanic/featured/plans`);
};

export const buyFeaturedListing = (mechanicId, planName) => {
  return axios.post(`${API_BASE_URL}/mechanic/featured/buy`, {
    mechanicId,
    planName,
  });
};