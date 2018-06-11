import moment from 'moment';

const displayDate = () => {
    moment.locale('hu');

    const datePara = document.createElement('span');
    const currentDate = moment().format('LLLL');
    const footer = document.querySelector('footer');

    datePara.innerHTML = currentDate;
    footer.appendChild(datePara);
};

export default displayDate;
