
// A. Coppying Arrays 
const arr1 = [1, 2, 3];
const arr2 = [...arr1];

// console.log(arr2);


// B. Combing arrays [merge arrays]
const arr3 = [1, 2];
const arr4 = [3, 4];

const combinedArr = [...arr3, ...arr4];

// console.log(combinedArr);

// C.Adding elements to an array 
const newArr = [0, ...arr3, 2.5, ...arr4, 5, 9];
// console.log(newArr);

// Convert string to array 
const str = "hello";
const chars = [...str];
console.log(chars);
