// JavaScript快速启动模板

// 1. 基础函数示例
function greet(name) {
    return `Hello, ${name}!`;
}

// 2. 数组操作示例
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('Original:', numbers);
console.log('Doubled:', doubled);

// 3. 对象操作示例
const person = {
    name: 'John',
    age: 30,
    greet: function() {
        return `Hi, I'm ${this.name}`;
    }
};

// 4. 异步操作示例
async function fetchData() {
    try {
        // 模拟异步操作
        const data = await new Promise(resolve => {
            setTimeout(() => resolve('Async data loaded!'), 1000);
        });
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// 5. 箭头函数和解构示例
const calculate = (a, b) => {
    const result = {
        sum: a + b,
        difference: a - b,
        product: a * b,
        quotient: a / b
    };
    
    return result;
};

// 6. 类定义示例
class Calculator {
    constructor(initialValue = 0) {
        this.value = initialValue;
    }
    
    add(num) {
        this.value += num;
        return this;
    }
    
    subtract(num) {
        this.value -= num;
        return this;
    }
    
    getValue() {
        return this.value;
    }
}

// 使用示例
console.log('Greeting:', greet('World'));
console.log('Person:', person.greet());
console.log('Calculations:', calculate(10, 5));

const calc = new Calculator(10);
console.log('Chained calculation:', calc.add(5).subtract(3).getValue());

// 执行异步函数
fetchData();

// 7. 模块导出示例 (CommonJS)
module.exports = {
    greet,
    calculate,
    Calculator,
    fetchData
};