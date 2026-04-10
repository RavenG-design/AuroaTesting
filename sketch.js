// 替换你目前的 sketch.js 内容
let auroraShader;

const vs = `
  precision highp float;
  attribute vec3 aPosition;
  void main() {
    gl_Position = vec4(aPosition * 2.0 - 1.0, 1.0);
  }
`;

const fs = `
  precision highp float;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;

  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    float dist = distance(st, u_mouse);
    float ripple = sin(dist * 50.0 - u_time * 5.0) * exp(-dist * 10.0);
    
    vec3 color1 = vec3(0.1, 0.8, 0.7); // 青色
    vec3 color2 = vec3(0.5, 0.2, 0.9); // 紫色
    
    float f = noise(st + u_time * 0.1 + ripple);
    vec3 finalColor = mix(color1, color2, st.y + ripple);
    finalColor *= (0.5 + 0.5 * sin(u_time + st.x * 3.0));
    
    gl_FragColor = vec4(finalColor * 0.6, 1.0);
  }
`;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('canvas-container');
  auroraShader = createShader(vs, fs);
}

function draw() {
  shader(auroraShader);
  auroraShader.setUniform('u_time', millis() / 1000.0);
  auroraShader.setUniform('u_resolution', [width, height]);
  auroraShader.setUniform('u_mouse', [mouseX / width, 1.0 - (mouseY / height)]);
  rect(-width/2, -height/2, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
