// function updateStocks(stocks, existingStocks) {
//     const stockMap = new Map(existingStocks.map(stock => [stock.size, stock.stock]));
//     stocks.forEach(({ size, stock }) => {
//         if (stockMap.has(size)) {
//             stockMap.set(size, stockMap.get(size) + stock); // Update existing stock
//         }
//     });
//     return Array.from(stockMap, ([size, stock]) => ({ size, stock }));
// }

const updateStocks = (stocks, existingStocks) => {
    const stockMap = new Map();
    existingStocks.map(({size, stock}) => stockMap.set(size,stock))
    stocks.map(({size, stock}) => {
        const count = stockMap.get(size);
        count == null ? stockMap.set(size,1) : stockMap.set(size,count+stock);
    })
    return Array.from(stockMap, ([size, stock]) => ({size, stock}));
}

const stocks = [
    { size: "S", stock: 10 },
    { size: "M", stock: 5 },
    { size: "L", stock: 7 },
    { size: "XXL", stock: 2}
];

const existingStocks = [
    { size: "S", stock: 20 },
    { size: "M", stock: 15 },
    { size: "L", stock: 10 },
];

console.log(updateStocks(stocks, existingStocks));
            
const alphabets = ['a','a','a','a','b','b','b','g']
const countFreq = (alphabets) => {
    const freqMap = new Map();
    alphabets.map((ch) => {
        const count = freqMap.get(ch);
        count == null ? freqMap.set(ch,1) : freqMap.set(ch, count + 1);
    })
    return freqMap;
}
console.log(countFreq(alphabets));