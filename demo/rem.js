// deviceWidth / 750 = x / 1 = rootFontSize = (y rem * x)px / y px
// 浏览器字体大小有限制，如果设为1px会以一个最小值计算，所以为了方便计算根节点字体大小一般会放大处理(这里是100px) 
(function(doc, win){
    const root = doc.documentElement;
    // 设备像素比(DPR)描述多少个物理像素(设备像素DP)来表示一个设备独立像素(逻辑像素|CSS像素)
    // 一开始是没有设备独立像素的，自从有了retina屏(视网膜屏像素密度PPI高)才有了这个概念
    // dpr2 24px == dpr1 12px == dpr3 36px 字体一般不做等比缩放即rem/vw
    const dpr = win.devicePixelRatio;
    if(!root) return;
    const reCalc = _ => {
        const deviceW = root.clientWidth;
        if(!deviceW) return;
        root.style.fontSize = deviceW / 750 * 100 + 'px';
        root.setAttribute('dpr', dpr);
        console.log('当前根节点字体大小: ' + deviceW / 750 * 100 + 'px') ;
    };
    let timer;
    const debounce = (cb, delay) => () => {
        clearTimeout(timer);
        timer = setTimeout(cb, delay);
    }
    win.onresize = debounce(reCalc, 500);
    // win.addEventListener('DOMContentLoaded', debounce(reCalc, 0), false);
    win.addEventListener('DOMContentLoaded', reCalc, false);
}(document, window))