// 获取DOM元素
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const startBtn = document.getElementById('startBtn');
const snapBtn = document.getElementById('snapBtn');
const stopBtn = document.getElementById('stopBtn');
const downloadLink = document.getElementById('downloadLink');

// 全局变量
let stream = null;

// 开启摄像头
startBtn.addEventListener('click', async () => {
    try {
        // 获取摄像头权限
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }, 
            audio: false 
        });
        
        // 将视频流设置到video元素
        video.srcObject = stream;
        
        // 启用拍照和关闭按钮
        snapBtn.disabled = false;
        stopBtn.disabled = false;
        startBtn.disabled = true;
        
        console.log('摄像头已开启');
    } catch (err) {
        console.error('无法访问摄像头:', err);
        alert('无法访问摄像头，请检查权限设置或使用HTTPS连接。');
    }
});

// 拍照功能
snapBtn.addEventListener('click', () => {
    if (!stream) {
        alert('请先开启摄像头！');
        return;
    }
    
    // 设置canvas尺寸与视频相同
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // 将视频帧绘制到canvas上
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // 将canvas内容转换为图片数据
    const imageData = canvas.toDataURL('image/png');
    
    // 显示拍摄的照片
    photo.src = imageData;
    photo.style.display = 'block';
    
    // 设置下载链接
    downloadLink.href = imageData;
    downloadLink.download = `snapshot_${new Date().getTime()}.png`;
    downloadLink.textContent = '下载照片';
    downloadLink.style.display = 'inline-block';
    
    console.log('照片已拍摄');
});

// 关闭摄像头
stopBtn.addEventListener('click', () => {
    if (stream) {
        // 停止所有视频轨道
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        
        // 清空视频源
        video.srcObject = null;
        stream = null;
        
        // 重置按钮状态
        startBtn.disabled = false;
        snapBtn.disabled = true;
        stopBtn.disabled = true;
        
        console.log('摄像头已关闭');
    }
});

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('JS快拍程序已加载');
    
    // 检查浏览器是否支持getUserMedia API
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('您的浏览器不支持摄像头访问功能，请使用现代浏览器（如Chrome、Firefox、Edge）访问。');
        startBtn.disabled = true;
    }
});

// 添加键盘事件支持：按空格键拍照
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !snapBtn.disabled) {
        event.preventDefault(); // 防止页面滚动
        snapBtn.click();
    }
});

// 添加拍照音效模拟
function playSnapSound() {
    try {
        // 创建音频上下文来模拟快门声音
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.value = 1000;
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
        
        setTimeout(() => {
            oscillator.stop();
        }, 100);
    } catch (e) {
        // 如果浏览器不支持Web Audio API，则忽略
        console.log('浏览器不支持音频反馈');
    }
}

// 修改拍照按钮点击事件，添加音效
snapBtn.addEventListener('click', () => {
    if (!stream) {
        alert('请先开启摄像头！');
        return;
    }
    
    // 设置canvas尺寸与视频相同
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // 将视频帧绘制到canvas上
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // 将canvas内容转换为图片数据
    const imageData = canvas.toDataURL('image/png');
    
    // 显示拍摄的照片
    photo.src = imageData;
    photo.style.display = 'block';
    
    // 设置下载链接
    downloadLink.href = imageData;
    downloadLink.download = `snapshot_${new Date().getTime()}.png`;
    downloadLink.textContent = '下载照片';
    downloadLink.style.display = 'inline-block';
    
    // 播放快门音效
    playSnapSound();
    
    console.log('照片已拍摄');
});