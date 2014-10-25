
(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory(require, exports, module);
    }
    else if(typeof define === 'function' && define.amd) {
        define(['require', 'exports', 'module'], factory);
    }
    else {
        var req = function(id) {return root[id];},
            exp = root,
            mod = {exports: exp};
        root['WebGL'] = factory(req, exp, mod);
    }
}(this, 
/** @lends WebGL */ 
function(require, exports, module) {

/**
 * 책 보고 구현해보는 openGL.
 * @class WebGL
 * @param  {Element} canvas canvas element
 * @returns {WebGL}
 */
function WebGL(canvas){
	this.ctx = canvas.getContext('2d');
	this.canvas = canvas;
}

/* global setPixel, DDALine, BHLine, midPointLine, midPointCircle, save, restore, clear */
WebGL.prototype.setPixel			= setPixel;
WebGL.prototype.DDALine			= DDALine;
WebGL.prototype.BHLine			= BHLine;
WebGL.prototype.midPointLine		= midPointLine;
WebGL.prototype.save				= save;
WebGL.prototype.restore			= restore;
WebGL.prototype.clear			= clear;
WebGL.prototype.midPointCircle	= midPointCircle;

/* exported BHLine */

/**
 * Bresenham 직선 알고리즘
 * @method WebGL.prototype.BHLine
 * @param  {int} start_x 시작 x값
 * @param  {int} start_y 시작 y값
 * @param  {int} end_x   끝 x값
 * @param  {int} end_y   끝 y값
 * @return {WebGL}
 */
function BHLine(start_x, start_y, end_x, end_y){
	var dx = Math.abs( end_x - start_x ),
		dy = Math.abs( end_y - start_y );

	var twoDy = 2 * dy, twoDyMinusDx = 2 * (dy - dx);
	var twoDx = 2 * dx, twoDxMinusDy = 2 * (dx - dy);

	var draw_x, draw_y, p;

	var m = (end_y - start_y) / (end_x - start_x);

	if( 0 < m && m < 1 ){
		p = 2 * dy - dx;

		if( start_x > end_x ){
			draw_x = end_x;
			draw_y = end_y;
			end_x = start_x;
		}else{
			draw_x = start_x;
			draw_y = start_y;
		}

		while(draw_x <= end_x){
			this.setPixel(draw_x, draw_y);
			
			if(p < 0){
				p += twoDy;
			}else{
				draw_y++;
				p += twoDyMinusDx;
			}
			draw_x++;
		}
	}
	
	if( 1 < m && m < Infinity){
		p = 2 * dx - dy;

		if( start_y > end_y ){
			draw_x = end_x;
			draw_y = end_y;
			end_y = start_y;
		}else{
			draw_x = start_x;
			draw_y = start_y;
		}

		while(draw_y <= end_y){
			this.setPixel(draw_x, draw_y);
			
			if(p < 0){
				p += twoDx;
			}else{
				draw_x++;
				p += twoDxMinusDy;
			}
			draw_y++;
		}
	}

	if( -1 < m && m < 0 ){
		p = 2 * dy - dx;

		if( start_x < end_x ){
			draw_x = end_x;
			draw_y = end_y;
			end_x = start_x;
		}else{
			draw_x = start_x;
			draw_y = start_y;
		}

		while(draw_x >= end_x){
			this.setPixel(draw_x, draw_y);
			
			if(p < 0){
				p += twoDy;
			}else{
				draw_y++;
				p += twoDyMinusDx;
			}
			draw_x--;
		}
	}

	if( -Infinity < m && m < -1 ){
		p = 2 * dx - dy;

		if( start_y < end_y ){
			draw_x = end_x;
			draw_y = end_y;
			end_y = start_y;
		}else{
			draw_x = start_x;
			draw_y = start_y;
		}

		while(draw_y >= end_y){
			this.setPixel(draw_x, draw_y);
			
			if(p < 0){
				p += twoDx;
			}else{
				draw_x++;
				p += twoDxMinusDy;
			}
			draw_y--;
		}
	}

	if( m === 0){
		if( start_x > end_x ){
			draw_x = end_x;
			draw_y = end_y;
			end_x = start_x;
		}else{
			draw_x = start_x;
			draw_y = start_y;
		}

		while(draw_x <= end_x){
			this.setPixel(draw_x, draw_y);
			draw_x++;
		}
	}

	if( m === Infinity || m === -Infinity ){
		if( start_y > end_y ){
			draw_x = end_x;
			draw_y = end_y;
			end_y = start_y;
		}else{
			draw_x = start_x;
			draw_y = start_y;
		}

		while(draw_y <= end_y){
			this.setPixel(draw_x, draw_y);
			draw_y++;
		}
	}

	if( m === 1 ){
		if( start_y > end_y ){
			draw_x = end_x;
			draw_y = end_y;
			end_y = start_y;
		}else{
			draw_x = start_x;
			draw_y = start_y;
		}

		while(draw_y <= end_y){
			this.setPixel(draw_x, draw_y);
			draw_y++;
			draw_x++;
		}
	}

	if( m === -1 ){
		if( start_y < end_y ){
			draw_x = end_x;
			draw_y = end_y;
			end_y = start_y;
		}else{
			draw_x = start_x;
			draw_y = start_y;
		}

		while(draw_y >= end_y){
			this.setPixel(draw_x, draw_y);
			draw_y--;
			draw_x++;
		}
	}

	return this;
}
/* exported DDALine */

/**
 * DDA 직선 알고리즘
 * @method WebGL.prototype.DDALine
 * @param  {int} start_x 시작 x값
 * @param  {int} start_y 시작 y값
 * @param  {int} end_x   끝 x값
 * @param  {int} end_y   끝 y값
 * @return {WebGL}
 */
function DDALine(start_x, start_y, end_x, end_y){
	var dx = end_x - start_x,
		dy = end_y - start_y;

	var steps = (Math.abs(dx) > Math.abs(dy)) ? Math.abs(dx) : Math.abs(dy),
		step;

	var xIncrement = dx / steps,
		yIncrement = dy / steps;

	var draw_x = start_x,
		draw_y = start_y;

	this.setPixel(Math.round(draw_x), Math.round(draw_y));

	for(step = 0 ; step < steps ; step++){
		draw_x += xIncrement;
		draw_y += yIncrement;
		this.setPixel(Math.round(draw_x), Math.round(draw_y));
	}

	return this;
}
/* exported clear */

/**
 * 화면을 모두 지운다.
 * @method WebGL.prototype.clear
 * @return {WebGL}
 */
function clear(){
	 this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	 return this;
}
/* exported midPointCircle */

/**
 * MidPoint Circle Algorithm 을 구현한 메소드
 * @method WebGL.prototype.midPointCircle
 * @param  {int} xc 원의 중심 x값.
 * @param  {int} yc 원의 중심 y값.
 * @param  {int} radius 원의 반지름
 * @return {WebGL}
 */
function midPointCircle(xc, yc, radius){
	var p, x, y;

	p = 5 - 4 * radius;
	x = 0;
	y = radius;

	while( x <= y ){
		setPoint.call(this, xc, yc, x, y);

		x++;
		if( p < 0 ){
			p += 8 * x + 4;
		}else{
			y--;
			p += 8 * x + 4 - 8 * y;
		}
	}
}

/**
 * 1/8원 나머지를 그려주는 midPointCircle helpler 함수.
 * @param {int} xc 원의 중심 x값.
 * @param {int} yc 원의 중심 y값.
 * @param {int} x  1/8원을 그릴 점 x값.
 * @param {int} y  1/8원을 그릴 점 y값.
 */
function setPoint(xc, yc, x, y){
	this.setPixel(xc + x, yc + y);
	this.setPixel(xc + x, yc - y);
	if( x === 0 ){
		this.setPixel(xc + y, yc + x);
		this.setPixel(xc - y, yc + x);
	}
	else if( x === y ){
		this.setPixel(xc - x, yc + y);
		this.setPixel(xc - x, yc - y);
	}
	else{
		this.setPixel(xc - x, yc + y);
		this.setPixel(xc - x, yc - y);

		this.setPixel(xc + y, yc + x);
		this.setPixel(xc + y, yc - x);

		this.setPixel(xc - y, yc + x);
		this.setPixel(xc - y, yc - x);
	}
}
/* exported midPointLine */

/**
 * MidPoint 직선 알고리즘
 * @method WebGL.prototype.midPointLine
 * @param  {int} start_x 시작 x값
 * @param  {int} start_y 시작 y값
 * @param  {int} end_x   끝 x값
 * @param  {int} end_y   끝 y값
 * @return {WebGL}
 */
function midPointLine(start_x, start_y, end_x, end_y){
	var dx = Math.abs( end_x - start_x ),
		dy = Math.abs( end_y - start_y );

	var twoDy = 2 * dy;
	var twoDx = 2 * dx;

	var sx = ( end_x >= start_x ) ? 1 : -1;
	var sy = ( end_y >= start_y ) ? 1 : -1;

	var draw_x, draw_y, p;

	if( dx >= dy ){
		p = 2 * dy - dx;
		draw_x = start_x;
		draw_y = start_y;

		while( 0 <= (end_x - draw_x) * sx){
			this.setPixel(draw_x, draw_y);

			draw_x += sx;
			p += twoDy;
			if( p >= 0 ){
				draw_y += sy;
				p -= twoDx;
			}
		}
	}
	else{
		p = 2 * dx - dy;
		draw_x = start_x;
		draw_y = start_y;

		while( 0 <= (end_y - draw_y) * sy){
			this.setPixel(draw_x, draw_y);

			draw_y += sy;
			p += twoDx;
			if( p >= 0 ){
				draw_x += sx;
				p -= twoDy;
			}
		}
	}
	return this;
}
/* exported restore */

/**
 * 배경으로 복구한다.
 * @method WebGL.prototype.restore
 * @return {WebGL}
 */
function restore(){
	this.ctx.putImageData(this.bg, 0, 0);
	return this;
}
/* exported save */

/**
 * 현제 화면을 배경으로 저장한다.
 * @method WebGL.prototype.save
 * @return {WebGL}
 */
function save(){
	  this.bg = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
	  return this;
}
/**
 * 점을 찍는 메소드.
 * @method WebGL.prototype.setPixel
 * @param {int} x x좌표값
 * @param {int} y y좌표값
 * @return {WebGL}
 */

/* exported setPixel */
function setPixel(x, y){
	this.ctx.fillRect(x, y, 1, 1);
	return this;
}
return WebGL;
}));