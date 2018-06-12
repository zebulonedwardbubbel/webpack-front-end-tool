const testFn = () => {
    const testMessage = 'Staticly imported ES6 module works ✊';
    const wholeTestmessage = `Test message: ${testMessage}`;
    const paragraph = document.createElement('p');

    paragraph.textContent = wholeTestmessage;
    document.querySelector('main').appendChild(paragraph);
};

export default testFn;
