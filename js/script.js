let menu_list = document.getElementById('menu-list')
let orders_list = document.getElementById('orders-list')
let sum = document.getElementById('sum')
let items_count = document.getElementById('items-count')

const renderMenuItem = (product) => {
  return `
    <div class="food-card" data-product='${JSON.stringify(product)}' onclick="onClickCard(event)">
      <img src="${product.img}" class="food-img">
      <div>
        <div class="food-name">${product.name}</div>
        <div>${product.price} сом</div>
      </div>
    </div>
  `
}

const renderOrderItem = (orderItem) => {
  return `
    <li class="order-item">
      <div class="order-item_title">${orderItem.name}</div>
      <div class="order-item_count">Количество : <span>${
        orderItem.count
      }</span></div>
      <div class="order-item_price">Сумма : <span>${
        orderItem.price
      } сом</span></div>
      <div class="order-item_delete">
        <img data-order='${JSON.stringify(
          orderItem
        )}
        ' onclick="onDelete()" src="./images/delete.png" >  
      </div>
    </li>
  `;
}

const renderOrder = () => {
  let items = []
  orders_basked.map((item, id) => {
    items.push(renderOrderItem(item))
  })
  orders_list.innerHTML = items.join("")
}

const renderMenuList = (List) => {
  let items = []
  List.map((elem, id) => {
    items.push(renderMenuItem(elem))
  })
  menu_list.innerHTML = items.join("")
}

const onClickCard = (event) => {
  let card = JSON.parse(event.target.dataset.product)

  let currentIndex = orders_basked.findIndex( el => el.id == card.id )
  if ( currentIndex == -1 ) {
    orders_basked.push({
      ...card,
      count: 1
    })
  }else{
    orders_basked[currentIndex].count ++
    orders_basked[currentIndex].price += card.price
  }
  
  renderOrder()
  solveSum()
  getCount()
}

const solveSum = () => {
  sum.innerHTML = orders_basked.reduce((el, {price}) => el + price , 0)
}

const getCount = () => {
  items_count.innerHTML = orders_basked.reduce((el, {count}) => el + count , 0 )
}

const onDelete = () => {
  let current_order = JSON.parse(event.target.dataset.order)

  let currentIndex = orders_basked.findIndex( el => el.id == current_order.id )

  let item_price = menu_items.find(el => el.id == current_order.id).price

  if (current_order.count > 1) {
    orders_basked[currentIndex].count -- 
    orders_basked[currentIndex].price -= item_price
    renderOrder()
  } else {
    orders_basked.splice(currentIndex, 1)
    renderOrder()
  }

  solveSum()
  getCount()
}

renderMenuList(menu_items)