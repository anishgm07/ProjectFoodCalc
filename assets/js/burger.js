let people = [];

document.getElementById('calculateBtn').addEventListener('click', () => {
    const name = document.getElementById('personName').value.trim();
    if (name) {
        // Gather individual order input for the person
        const individualOrder = {
            mcchicken: parseInt(document.getElementById('mcchicken').value) || 0,
            fries: parseInt(document.getElementById('fries').value) || 0,
            milkshake: parseInt(document.getElementById('milkshake').value) || 0,
        };

        // Gather set input based on dynamic selections
        const setOrders = {
            burgerSet: parseInt(document.getElementById('burgerSet').value) || 0,
        };

        const orderList = [];

        // Add individual items and sets to order list if quantity > 0
        for (let item in individualOrder) {
            const quantity = individualOrder[item];
            if (quantity > 0) {
                orderList.push({ item, quantity });
            }
        }

        // Add the set items to the order if quantity > 0
        if (setOrders.burgerSet > 0) {
            const burgerType = document.getElementById('burgerType').value;
            const sideType = document.getElementById('burgerSide').value;
            const shakeType = document.getElementById('burgerShake').value;
            orderList.push({ item: `Burger Set (${burgerType}, ${sideType}, ${shakeType})`, quantity: setOrders.burgerSet });
        }

        // Add person and their order to the 'people' array
        people.push({ name, order: orderList });

        // Clear the input fields for the next person
        document.getElementById('personName').value = '';
        document.getElementById('mcchicken').value = 0;
        document.getElementById('fries').value = 0;
        document.getElementById('milkshake').value = 0;
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
        document.getElementById('printOrder').style.display = 'block';
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

    printWindow.document.close(); // Ensure the document is ready to print
    printWindow.print(); // Trigger the print dialog
});

document.getElementById('increase').addEventListener('click', function () {
    var input = document.getElementById('burgerSet');
    input.value = parseInt(input.value) + 1;
});

document.getElementById('decrease').addEventListener('click', function () {
    var input = document.getElementById('burgerSet');
    if (input.value > 0) {
        input.value = parseInt(input.value) - 1;
    }
});

