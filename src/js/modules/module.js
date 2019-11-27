const testFn = () => {
    const testMessage = 'Staticly imported ES6 module works ✊';
    const wholeTestmessage = `Test message: ${testMessage}`;
    const array1 = [1, 4, 9, 16];
    const map1 = array1.map(x => x * 2);

    console.log(map1);
    console.log(wholeTestmessage);
};

export default testFn;
