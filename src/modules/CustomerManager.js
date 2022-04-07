const remoteURL = "http://localhost:8088"

export const getCustomerById = (customerId) => {
  return fetch(`${remoteURL}/customers/${customerId}?_expand=animal&_expand=location`)
  .then(res => res.json())
}

export const getAllCustomers = () => {
  return fetch(`${remoteURL}/customers?_expand=animal&_expand=location`)
  .then(res => res.json())
}

export const deleteCustomer = id => {
  return fetch(`${remoteURL}/customers/${id}`, {
      method: "DELETE"
  }).then(result => result.json())
}