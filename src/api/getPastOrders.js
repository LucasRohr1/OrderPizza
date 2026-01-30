export default function getPastOrders(page) {
  return fetch(`/api/past-orders?page=${page}`).then((res) => res.json());
}