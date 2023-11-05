// passing an array of elements to return a random one
export const randomElement = (arr) => {
    const itemNumber = Math.floor(Math.random() * (arr.length));
    return arr[itemNumber];
};

export const totalSum = (arr) => {
    let totalSum = 0;
    arr.forEach(ele => totalSum += Number(ele.price.slice(1)));

    return totalSum;
}
