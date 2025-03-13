import {sendGetRequest} from "@/_config/apiConfig";

export async function fetchProduct(productId, userId) {
  let params = {populate: "*"};
  if (userId) {
    params['filters[user][id][$eq]'] = userId;
  }
  if (productId) {
    params['filters[id][$eq]'] = productId;
  }
  return sendGetRequest('/products', params)
}

export async function fetchProducts(userId) {
  let params = {populate: "*"};
  if (userId) {
    params['filters[user][id][$eq]'] = userId;
  }
  return sendGetRequest('/products', params)
}