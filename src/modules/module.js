const testFn = () => {
    const firstVar = { name: 'Jesse' };
    const secondVar = {
        amount: 7,
        product: 'Meth',
        unitprice: 100
    };
    const message = `Hello ${firstVar.name}, want to buy ${secondVar.amount} ounce of ${secondVar.product} for ${secondVar.amount * secondVar.unitprice} bucks?`;

    const paragraph = document.querySelector('p');
    paragraph.textContent = message;
};

export default testFn;
