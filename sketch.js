// sketch.js - 重构为：极简文字流场（文字柳树）

let words = []; // 存储所有的文字粒子
let fontSerif; // 存储衬线字体（用于文學感）
const poemLines = [
    "I blend product thinking with digital art to craft immersive experiences.",
    "Beyond the Canvas: Beyond the Canvas: Beyond the Canvas:",
    "human psychology + generative art",
    "Product Designer & Digital Illustrator",
    "SELECTED WORKS",
    "Explore Works ↓",
    "RAVEN'S PLAYGROUND",
    "ABOUT ME",
    "RESUME.PDF"
];

function preload() {
    // 关键：为了审美，我们需要一个精致的衬线字体。
    // 在 GitHub assets 文件夹中上传一个 .ttf 字体文件。
    // 如果没有，p5.js 会回退到默认字体，但效果会打折扣。
    // fontSerif = loadFont('assets/PlayfairDisplay.ttf'); 
}

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    noStroke();
    
    // 初始化文字粒子
    for (let i = 0; i < 60; i++) { // 生成 60 个文字流
        let x = random(width);
        let y = random(height);
        // 随机选择一句诗意文案
        let textStr = random(poemLines);
        words.push(new WordParticle(x, y, textStr));
    }
}

function draw() {
    // 改动：背景使用你参考图中那种像宣纸一样的低饱和度灰褐色
    background(240, 238, 230); // Sage/Taupe Paper Color
    
    // 文字颜色：极低饱和度的深灰，像水墨
    fill(50, 50, 50, 60); // 半透明深灰，增加层次感
    
    // 设置字体
    // if(fontSerif) textFont(fontSerif);
    textSize(14); // 极小、精致的文字

    // 更新并绘制所有文字粒子
    for (let i = 0; i < words.length; i++) {
        // 计算鼠标的力的源点
        let forcePoint = createVector(mouseX, mouseY);
        words[i].update(forcePoint);
        words[i].display();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// 文字粒子类 (WordParticle)
// 它是一个基于流场和鼠标力的系统，让文字看起来像柳条
class WordParticle {
    constructor(x, y, textStr) {
        this.basePos = createVector(x, y); // 基础位置
        this.pos = createVector(x, y); // 当前位置
        this.textStr = textStr;
        // 随机一个初始流动速度
        this.vel = createVector(random(-0.2, 0.2), random(-0.2, 0.2)); 
        this.acc = createVector(0, 0);
        this.noiseScale = 0.005; // 噪波比例（决定流动复杂程度）
        this.noiseOffset = random(100); // 随机噪波偏移
    }

    update(forcePoint) {
        // 1. 基于 Perlin 噪波生成一个流动方向（流场）
        let n = noise(this.pos.x * this.noiseScale, this.pos.y * this.noiseScale, frameCount * 0.001);
        let angle = map(n, 0, 1, 0, TWO_PI * 4); // 角度随时间变化
        let flowForce = p5.Vector.fromAngle(angle).mult(0.01); // 流动的力
        this.acc.add(flowForce);

        // 2. 鼠标排斥力（接收鼠标交互，像风一样拨弄柳条）
        let dist = p5.Vector.dist(this.pos, forcePoint);
        if (dist < 150) { // 鼠标附近生效
            let mouseForce = p5.Vector.sub(this.pos, forcePoint);
            mouseForce.normalize();
            // 鼠标越近，斥力越强（但要温和，符合柳树审美）
            mouseForce.mult(map(dist, 0, 150, 0.2, 0)); 
            this.acc.add(mouseForce);
        }

        // 3. 基础位置还原力（让文字不乱飘，始终维持柳树的大致形状）
        let returnForce = p5.Vector.sub(this.basePos, this.pos);
        returnForce.mult(0.002); // 极弱的还原力
        this.acc.add(returnForce);

        // 更新物理运动
        this.vel.add(this.acc);
        this.vel.limit(0.5); // 限制速度，保持安静
        this.pos.add(this.vel);
        this.acc.mult(0); // 清空加速度
    }

    display() {
        // 绘制文字
        push();
        translate(this.pos.x, this.pos.y);
        // 让文字排列成垂直的或倾斜的，像柳条
        rotate(PI / 2); // 旋转 90 度，垂直向下排列
        text(this.textStr, 0, 0);
        pop();
    }
}
