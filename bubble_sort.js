/**
 * 冒泡排序算法实现
 * @param {number[]} arr - 待排序的数组
 * @returns {number[]} 排序后的数组
 */
function bubbleSort(arr) {
    const n = arr.length;
    
    // 外层循环控制排序轮数
    for (let i = 0; i < n - 1; i++) {
        // 标记本轮是否发生交换，用于优化
        let swapped = false;
        
        // 内层循环进行相邻元素比较和交换
        for (let j = 0; j < n - i - 1; j++) {
            // 如果前一个元素大于后一个元素，则交换
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                
                // 标记发生交换
                swapped = true;
            }
        }
        
        // 如果本轮没有发生交换，说明数组已经有序，可以提前结束
        if (!swapped) {
            break;
        }
    }
    
    return arr;
}

// 示例使用
console.log("冒泡排序示例：");
let numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("原数组:", numbers);

let sortedNumbers = bubbleSort([...numbers]); // 使用扩展运算符创建副本，避免修改原数组
console.log("排序后:", sortedNumbers);

// 更多测试用例
console.log("\n其他测试用例：");
console.log("空数组:", bubbleSort([]));
console.log("单个元素:", bubbleSort([42]));
console.log("已排序数组:", bubbleSort([1, 2, 3, 4, 5]));
console.log("逆序数组:", bubbleSort([5, 4, 3, 2, 1]));
console.log("包含重复元素:", bubbleSort([3, 1, 4, 1, 5, 9, 2, 6, 5]));