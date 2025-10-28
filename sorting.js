/**
 * JavaScript 排序算法集合
 */

// 1. 冒泡排序 (Bubble Sort)
function bubbleSort(arr) {
    const result = [...arr]; // 创建副本，避免修改原数组
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                // 交换元素
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    
    return result;
}

// 2. 选择排序 (Selection Sort)
function selectionSort(arr) {
    const result = [...arr];
    const n = result.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        
        // 找到最小元素的索引
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        // 交换元素
        if (minIndex !== i) {
            [result[i], result[minIndex]] = [result[minIndex], result[i]];
        }
    }
    
    return result;
}

// 3. 插入排序 (Insertion Sort)
function insertionSort(arr) {
    const result = [...arr];
    
    for (let i = 1; i < result.length; i++) {
        let current = result[i];
        let j = i - 1;
        
        while (j >= 0 && result[j] > current) {
            result[j + 1] = result[j];
            j--;
        }
        
        result[j + 1] = current;
    }
    
    return result;
}

// 4. 快速排序 (Quick Sort)
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = [];
    const right = [];
    const equal = [];
    
    for (let element of arr) {
        if (element < pivot) {
            left.push(element);
        } else if (element > pivot) {
            right.push(element);
        } else {
            equal.push(element);
        }
    }
    
    return [...quickSort(left), ...equal, ...quickSort(right)];
}

// 5. 归并排序 (Merge Sort)
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }
    
    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// 6. 堆排序 (Heap Sort)
function heapSort(arr) {
    const result = [...arr];
    const n = result.length;
    
    // 构建最大堆
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(result, n, i);
    }
    
    // 逐个提取元素
    for (let i = n - 1; i > 0; i--) {
        [result[0], result[i]] = [result[i], result[0]];
        heapify(result, i, 0);
    }
    
    return result;
}

function heapify(arr, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// 测试函数
function testSorting() {
    const testArray = [64, 34, 25, 12, 22, 11, 90, 5];
    
    console.log("原始数组:", testArray);
    console.log("冒泡排序:", bubbleSort(testArray));
    console.log("选择排序:", selectionSort(testArray));
    console.log("插入排序:", insertionSort(testArray));
    console.log("快速排序:", quickSort(testArray));
    console.log("归并排序:", mergeSort(testArray));
    console.log("堆排序:", heapSort(testArray));
    console.log("原生排序:", [...testArray].sort((a, b) => a - b));
}

// 导出函数（如果在Node.js环境中使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        bubbleSort,
        selectionSort,
        insertionSort,
        quickSort,
        mergeSort,
        heapSort,
        testSorting
    };
}

// 如果在浏览器环境中运行，执行测试
if (typeof window !== 'undefined') {
    testSorting();
}

// 默认执行测试
testSorting();