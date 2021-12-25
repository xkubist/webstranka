
export const environment = {
  production: false
};

export const backendEnvironment = {
  production: false,
  title: 'local database',
  apiUrl: 'https://webstranka-45787-default-rtdb.europe-west1.firebasedatabase.app'
};

export const bottleStorageEnvironment = {
  production: false,
  title: 'bottles database',
  apiUrl: backendEnvironment.apiUrl+'/bottles.json'
}

export const orderStorageEnvironment = {
  production: false,
  title: 'orders database',
  apiUrl: backendEnvironment.apiUrl+'/order.json'
}

export const shoppingListStorageEnvironment = {
  production: false,
  title: 'shopping list database',
  apiUrl: backendEnvironment.apiUrl+'/shoppingList.json'
}

