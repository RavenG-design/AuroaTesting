{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 // sketch.js\
let auroraShader;\
\
function setup() \{\
  // \uc0\u23558 \u30011 \u24067 \u25918 \u20837  HTML \u20013 \u25351 \u23450 \u30340 \u23481 \u22120 \u20869 \
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL);\
  canvas.parent('canvas-container'); \
  noStroke();\
\
  // \uc0\u32534 \u35793 \u20043 \u21069 \u30340  Shader \u20195 \u30721  (vs \u21644  fs \u23383 \u31526 \u20018 )\
  auroraShader = createShader(vs, fs);\
\}\
\
function draw() \{\
  shader(auroraShader);\
  auroraShader.setUniform('u_time', millis() / 1000.0);\
  auroraShader.setUniform('u_resolution', [width, height]);\
  \
  // \uc0\u40736 \u26631 \u22352 \u26631 \u24402 \u19968 \u21270 \
  let mouseXNormalized = mouseX / width;\
  let mouseYNormalized = 1.0 - (mouseY / height);\
  auroraShader.setUniform('u_mouse', [mouseXNormalized, mouseYNormalized]);\
\
  // \uc0\u20840 \u23631 \u30697 \u24418 \
  rect(-width / 2, -height / 2, width, height);\
\}\
\
function windowResized() \{\
  // \uc0\u21709 \u24212 \u31383 \u21475 \u22823 \u23567 \u21464 \u21270 \
  resizeCanvas(windowWidth, windowHeight);\
\}\
\
// ==========================================\
// \uc0\u27492 \u22788 \u31896 \u36148 \u20043 \u21069 \u25552 \u20379 \u30340  Shader \u20195 \u30721  (vs \u21644  fs \u23383 \u31526 \u20018 )\
// ==========================================\
const vs = `...`; // \uc0\u31896 \u36148 \u20043 \u21069 \u30340  Vertex Shader\
const fs = `...`; // \uc0\u31896 \u36148 \u20043 \u21069 \u30340  Fragment Shader}