import { products } from "./products.js";

export const orders = JSON.parse(localStorage.getItem('order')) || [];

export function storeOrders(order) {
    orders.unshift(order);
    saveData();
}

function saveData() {
    localStorage.setItem('order', JSON.stringify(orders));
}

