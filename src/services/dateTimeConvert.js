export const convertIntoDateObj = (date) => {
    const dateArray = (date).replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ").split(" ");
    return new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4]);
}

export const convertFromDateObj = (date) => {
    const month = (date.getMonth() + 1) + ''
    const day = (date.getDate()) + ''
    return `${date.getFullYear()}-${month.padStart(2, 0)}-${day.padStart(2, 0)} ${date.getHours()}:${date.getMinutes()}`;
}