const transactions = [
    { id: 1, type: 'inkomend', datum: '2025-11-01', bedrag: 150.00, omschrijving: 'Salaris' },
    { id: 2, type: 'uitgaand', datum: '2025-11-03', bedrag: -50.00, omschrijving: 'Boodschappen' },
    { id: 3, type: 'inkomend', datum: '2025-11-05', bedrag: 200.00, omschrijving: 'Bonus' },
    { id: 4, type: 'uitgaand', datum: '2025-11-10', bedrag: -30.00, omschrijving: 'Koffie' },
    { id: 5, type: 'inkomend', datum: '2025-11-12', bedrag: 75.00, omschrijving: 'Verkoop' },
    { id: 6, type: 'uitgaand', datum: '2025-11-15', bedrag: -100.00, omschrijving: 'Huur' }
];

function displayTransactions(filteredTransactions) {
    const transactionList = document.getElementById('transaction-list');
    transactionList.innerHTML = '';

    if (filteredTransactions.length === 0) {
        transactionList.innerHTML = '<div>Geen transacties gevonden.</div>';
        return;
    }

    filteredTransactions.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.classList.add('transaction');

        const typeClass = transaction.type === 'inkomend' ? 'inkomend' : 'uitgaand';
        const bedragKleur = transaction.bedrag >= 0 ? 'positief' : 'negatief';

        transactionItem.innerHTML = `
            <div class="transaction-header">
                <span class="datum">${transaction.datum}</span>
                <span class="omschrijving">${transaction.omschrijving}</span>
                <span class="bedrag ${bedragKleur}">€${transaction.bedrag.toFixed(2)}</span>
            </div>
            <div class="transaction-type ${typeClass}">${transaction.type}</div>
        `;

        transactionList.appendChild(transactionItem);
    });

    const totaal = filteredTransactions.reduce((sum, t) => sum + t.bedrag, 0);
    const totaalDiv = document.createElement('div');
    totaalDiv.classList.add('totaal');

    const totaalKleur = totaal >= 0 ? 'positief' : 'negatief';
    totaalDiv.innerHTML = `<strong>Totaal:</strong> <span class="${totaalKleur}">€${totaal.toFixed(2)}</span>`;

    transactionList.appendChild(totaalDiv);
}

function filterTransactions() {
    const typeFilter = document.getElementById('filtertype').value;
    const filterdate = document.getElementById('filterdate').value;

    let filteredTransactions = transactions;

    if (typeFilter !== 'alle') {
        filteredTransactions = filteredTransactions.filter(
            transaction => transaction.type === typeFilter
        );
    }

    if (filterdate) {
        filteredTransactions = filteredTransactions.filter(
            transaction => transaction.datum === filterdate
        );
    }

    displayTransactions(filteredTransactions);
}

function resetFilters() {
    document.getElementById('filtertype').value = 'alle';
    document.getElementById('filterdate').value = '';
    displayTransactions(transactions);
}

displayTransactions(transactions);