const testFn = () => {
    const firstVar = { name: 'Jesse' };
    const secondVar = {
        amount: 7,
        product: 'Meth',
        unitprice: 122
    };
    const message = `Hello ${firstVar.name},
    want to buy ${secondVar.amount} ounce of ${secondVar.product} for
    a total of ${secondVar.amount * secondVar.unitprice} bucks?`;

    const paragraph = document.querySelector('p');
    paragraph.textContent = message;
};

export default testFn;
