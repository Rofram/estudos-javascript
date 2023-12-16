// função fibonacci com memoization
const fib = (n, memo = {}) => {
    if (n in memo) return memo[n]
    if (n <= 2) {
        return 1
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
}

console.log('Fibonacci', fib(1000))


// gridTravel com memoization
const gridTraveler = (m, n, memo = {}) => {
    const key = `${m},${n}`

    if (key in memo) return memo[key]
    if (m === 1 && n === 1) return 1;
    if (m === 0 || n === 0) return 0;

    memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo)
    return memo[key]
}

console.log('gridTraveler', gridTraveler(18,18))


const canSum = (n, arr, memo= {}) => {
    const key = `${n},${arr}`
    if (key in memo) return memo[key]
    if (n === 0) return true;
    if (arr.length === 0) return false;

    memo[key] = canSum(n - arr[0], arr.slice(1), memo) || canSum(n, arr.slice(1), memo)
    return memo[key]
}

console.log(canSum(100, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
