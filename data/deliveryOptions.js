import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


export const deliveryOptions = [{
    id : '1',
    deliveryDays : 7,
    priceCents : 0

},
{
    id : '2',
    deliveryDays : 3,
    priceCents : 499
},
{
    id: '3',
    deliveryDays : 1,
    priceCents : 999
}]

export function getDelivery(deliveryId) {

    let deliveryOption;
    deliveryOptions.forEach((option) => {
        if(option.id === deliveryId) {
            deliveryOption = option;
        }
        
    });

    return deliveryOption;

}

export function validDeliveryOption(deliveryId) {
    let found = false;
    deliveryOptions.forEach((option) => {
        if(option.id === deliveryId){
            found = true;
        }
    });
    return found;
}

export function calculateDeliveryDate(deliveryOption) {
    // const todayDate = dayjs();
    // const deliveryDays = todayDate.add(
    //     deliveryOption.deliveryDays, 'days'
    // );

    let deliveryDaysRemaining = deliveryOption.deliveryDays;
    let today = dayjs();

    while(deliveryDaysRemaining>0) {

        today = today.add(1,'days');

        if(!isWeekend(today)){
            deliveryDaysRemaining--;    
        }
    }

    const formatDate = today.format(
        'dddd, MMMM D'
    );

    return formatDate;
}


function isWeekend(date) {
    const dayOfWeek = date.format('dddd');

    return dayOfWeek === 'Sunday' || dayOfWeek === 'Saturday';
}



