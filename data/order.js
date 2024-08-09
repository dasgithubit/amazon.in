
export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function storeOrders(order) {
    orders.unshift(order);
    saveData();
}

function saveData() {
    localStorage.setItem('order', JSON.stringify(orders));
}


export function getOrder(orderId){

    let matchingOrder;

    orders.forEach((order) => {
        if(order.id === orderId){
            matchingOrder = order;
        }

    });

    return matchingOrder;
}

