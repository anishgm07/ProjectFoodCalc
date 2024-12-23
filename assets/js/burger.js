let people = [];

document.getElementById('calculateBtn').addEventListener('click', () => {
    const name = document.getElementById('personName').value.trim();
    if (name) {

        // Gather set input based on dynamic selections
        const setOrders = {
            burgerSet: parseInt(document.getElementById('burgerSet').value) || 0,
        };

        const orderList = [];

        // Add the set items to the order if quantity > 0
        if (setOrders.burgerSet > 0) {
            const burgerType = document.getElementById('burgerType').value;
            const sideType = document.getElementById('burgerSide').value;
            const shakeType = document.getElementById('burgerShake').value;
            orderList.push({ item: `Burger Set (${burgerType}, ${sideType}, ${shakeType})`, quantity: setOrders.burgerSet });
        }

        // Add individual menu items if their count > 0
        const burgerItemCount = parseInt(document.getElementById('burger').value) || 0;
        if (burgerItemCount > 0) {
            const burgerItem = document.getElementById('burgerItem').value;
            orderList.push({ item: `${burgerItem}`, quantity: burgerItemCount });
        }

        const sidesItemCount = parseInt(document.getElementById('sides').value) || 0;
        if (sidesItemCount > 0) {
            const sidesItem = document.getElementById('sidesItem').value;
            orderList.push({ item: `${sidesItem}`, quantity: sidesItemCount });
        }

        const beverageItemCount = parseInt(document.getElementById('beverage').value) || 0;
        if (beverageItemCount > 0) {
            const beverageItem = document.getElementById('beverageItem').value;
            orderList.push({ item: `${beverageItem}`, quantity: beverageItemCount });
        }

        // Add person and their order to the 'people' array
        people.push({ name, order: orderList });

        // Clear the input fields for the next person
        document.getElementById('personName').value = '';
        document.getElementById('burger').value = 0;
        document.getElementById('sides').value = 0;
        document.getElementById('beverage').value = 0;
        document.getElementById('burgerSet').value = 1;

        // Process and display individual orders
        const individualOrderList = document.getElementById('individualOrderList');
        individualOrderList.innerHTML = '';
        people.forEach(person => {
            const personItem = document.createElement('li');
            let orderDetails = `${person.name}: `;
            person.order.forEach(order => {
                orderDetails += `${order.item} - ${order.quantity}, `;
            });
            orderDetails = orderDetails.slice(0, -2); // Remove last comma
            personItem.textContent = orderDetails;
            individualOrderList.appendChild(personItem);
        });

        // Aggregate and display the total of all items ordered
        const itemsOrderedList = document.getElementById('itemsOrderedList');
        const allOrderedItems = {};

        // Aggregate item orders across all people
        people.forEach(person => {
            person.order.forEach(order => {
                if (allOrderedItems[order.item]) {
                    allOrderedItems[order.item] += order.quantity;
                } else {
                    allOrderedItems[order.item] = order.quantity;
                }
            });
        });

        // Display aggregated items
        itemsOrderedList.innerHTML = '';
        for (let item in allOrderedItems) {
            const itemElement = document.createElement('li');
            itemElement.textContent = `${item} - ${allOrderedItems[item]}`;
            itemsOrderedList.appendChild(itemElement);
        }

        // Show order summary section
        document.getElementById('orderSummary').style.display = 'block';
        document.getElementById('printOrder').style.display = 'flex';
    } else {
        alert("Please enter a valid name.");
    }
});

document.getElementById('printBtn').addEventListener('click', () => {
    // The following code is to ensure that only the order summary is printed, and not the whole page.
    const printContent = document.getElementById('orderSummary');
    const printWindow = window.open('', '', 'height=600,width=800');

    printWindow.document.write('<html><head><title>Burger Summary</title></head><body>');
    printWindow.document.write('<h1>McDonalds Burger</h1>');
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.print();
});

// Listen for clicks on any button with the class "change-count"
document.querySelectorAll('.change-count').forEach(button => {
    button.addEventListener('click', function () {
        // Get the action (increase or decrease) from the button's data-action attribute
        var action = this.getAttribute('data-action');
        var input = this.parentNode.querySelector('input');
        var currentValue = parseInt(input.value);

        // Adjust the value based on the action
        if (action === 'increase') {
            input.value = currentValue + 1;
        } else if (action === 'decrease' && currentValue > 0) {
            input.value = currentValue - 1;
        }
    });
});
