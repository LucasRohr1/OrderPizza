import { createLazyFileRoute } from '@tanstack/react-router'
import {useState} from 'react'
import {useQuery} from '@tanstack/react-query'
import getPastOrders from '../api/getPastOrders'
import getPastOrder from '../api/getPastOrder'
import Modal from '../Modal'
import { priceConverter } from '../useCurrency'

export const Route = createLazyFileRoute('/past')({
  component: PastOrdersRoute,
})



function PastOrdersRoute() {
  const [page, setPage] = useState(1)
  const [focusedOrder, setFocusedOrder] = useState(null) 
  
  const {isLoading, data} = useQuery({
    queryKey: ['past-orders', page], // queryKey is used to identify the query in the cache
    queryFn: () => getPastOrders(page), // queryFn is the function that fetches the data
    staleTime: 30000, // 30 seconds, time to consider the data is still valid without refetching
  })

  const {isLoading: isLoadingPastOrder, data: pastOrderData} = useQuery({ 
    queryKey: ['past-order', focusedOrder], // queryKey is used to identify the query in the cache
    queryFn: () => getPastOrder(focusedOrder), // queryFn is the function that fetches the data
    staleTime: 24 * 60 * 60 * 1000, // 24 hours, time to consider the data is still valid without refetching
    enabled: !!focusedOrder, // enabled is used to disable the query if focusedOrder is not set
  })

  if (isLoading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading your orders...</p>
    </div>
  )
  return (
    <div className="past-orders">
      <h1>Past Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button className="order-id-btn" onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
        <div>
          Page {page} of {Math.ceil(data.length / 10)}
        </div>
      </div>

      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {isLoadingPastOrder ? (
            <div className="loading-order-details">
              <div className="loading-spinner"></div>
              <p>Loading order details...</p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{priceConverter(pizza.price)}</td>
                    <td>{priceConverter(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <button onClick={() => setFocusedOrder(null)}>Close</button>
        </Modal>
      ) : null}
    </div>
  )
}
