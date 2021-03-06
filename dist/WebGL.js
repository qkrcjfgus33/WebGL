
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
/*
 "WebGL - v0.0.0 -  2014-11-10" 
*/
// Source: temp/method/BHLine.js
var BHLine = (function(){

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
return BHLine;
})();
// Source: temp/method/DDALine.js
var DDALine = (function(){

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
return DDALine;
})();
// Source: temp/method/clear.js
var clear = (function(){

	/* exported clear */
	
	/**
	 * canvas를 지운다.
	 * @method WebGL.prototype.clear
	 * @return {WebGL}
	 */
	function clear( x , y , w , h ){
		this.ctx.save();
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.restore();
		 
		var layers = this.layers;
		var len = layers.length;
		var i ;
		var layer;
	
		for( i = 0 ; i < len ; i++) {
			layer = layers[i];
			
			layer.ctx.save();
			layer.ctx.setTransform(1, 0, 0, 1, 0, 0);
			layer.ctx.clearRect(0, 0, layer.width, layer.height);
			layer.ctx.restore();
		}
		
		 return this;
	}
return clear;
})();
// Source: temp/method/getLayer.js
var getLayer = (function(){

	/**
	 * layer 생성 및 반환.
	 * @method WebGL.prototype.getLayer
	 * @param {Number} [x=0]      start x
	 * @param {Number} [y=0]      start y
	 * @param {Number} [width=canvas.width]  width
	 * @param {Number} [height=canvas.width]  height
	 * @returns {WebGL}
	 */
	
	/* exported getLayer */
	function getLayer(x, y, width, height){
		x = ( x === undefined ) ? 0 : x;
		y = ( y === undefined ) ? 0 : y;
		width = ( width === undefined ) ? this.width : width;
		height = ( height === undefined ) ? this.height : height;
		
		var new_canvas = getCanvas( width, height );
		var layer = new WebGL(new_canvas, x, y, width, height);
		layer.index = this.layers.length;
		this.layers.push(layer);
		return layer;
	}
	
	function getCanvas(width, height){
		var canvas = document.createElement('canvas');
		canvas.setAttribute('width', height);
		canvas.setAttribute('height', height);
		return canvas;
	}
return getLayer;
})();
// Source: temp/method/midPointCircle.js
var midPointCircle = (function(){

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
return midPointCircle;
})();
// Source: temp/method/midPointCircleSolid.js
var midPointCircleSolid = (function(){

	/* exported midPointCircleSolid */
	
	/**
	 * MidPoint Circle Algorithm 을 구현한 메소드 (solid)
	 * @method WebGL.prototype.midPointCircleSolid
	 * @param  {int} xc 원의 중심 x값.
	 * @param  {int} yc 원의 중심 y값.
	 * @param  {int} radius 원의 반지름
	 * @return {WebGL}
	 */
	function midPointCircleSolid(xc, yc, radius){
		var p, x, y;
	
		p = 5 - 4 * radius;
		x = 0;
		y = radius;
	
		while( x <= y ){
			setPointSolid.call(this, xc, yc, x, y, p);
	
			x++;
			if( p < 0 ){
				p += 8 * x + 4;
			}else{
				y--;
				p += 8 * x + 4 - 8 * y;
			}
		}
	
		return this;
	}
	
	/**
	 * 1/8원 나머지를 채워주는 midPointCircleSolid helpler 함수.
	 * @method WebGL.prototype.setPointSolid
	 * @private
	 * @param {int} xc 원의 중심 x값.
	 * @param {int} yc 원의 중심 y값.
	 * @param {int} x  1/8원을 그릴 점 x값.
	 * @param {int} y  1/8원을 그릴 점 y값.
	 * @param {int} pmode 양수면 선까지 잇고 음수면 점만 찍는다.
	 */
	function setPointSolid(xc, yc, x, y, pmode){
		if( x === 0 ){
			this.setPixel(xc + x, yc + y);
			this.setPixel(xc + x, yc - y);
	
			this.midPointLine(xc - y, yc, xc + y, yc);
		}
		else if( x === y ){
			this.midPointLine(xc - x, yc + y, xc + x, yc + y);
			this.midPointLine(xc - x, yc - y, xc + x, yc - y);
		}
		else{
			if( pmode < 0 ){
				this.setPixel(xc + x, yc + y);
				this.setPixel(xc + x, yc - y);
				this.setPixel(xc - y, yc + x);
				this.setPixel(xc - y, yc - x);
			}else{
				this.midPointLine(xc - x, yc + y, xc + x, yc + y);
				this.midPointLine(xc - x, yc - y, xc + x, yc - y);
			}
			this.midPointLine(xc - y, yc + x, xc + y, yc + x);
			this.midPointLine(xc - y, yc - x, xc + y, yc - x);
		}
	}
return midPointCircleSolid;
})();
// Source: temp/method/midPointEllipse.js
var midPointEllipse = (function(){

	/* exported midPointEllipse */
	
	/**
	 * MidPoint Ellipse Algorithm 을 구현한 메소드
	 * @method WebGL.prototype.midPointEllipse
	 * @param  {int} xc 타원의 중심 x값.
	 * @param  {int} yc 타원의 중심 y값.
	 * @param  {int} rx 타원의 x축 반지름
	 * @param  {int} ry 타원의 y축 반지름
	 * @return {WebGL}
	 */
	function midPointEllipse(xc, yc, rx, ry){
		var p, x, y;
	    	
	    	var rx2 = Math.pow(rx, 2);
	    	var ry2 = Math.pow(ry, 2);
	    	
	    	x = 0;
	    	y = ry;
	    	p = 4 * ry2 - rx2 * (4 * ry - 1);
	    	
	    	while( ry2 * x <= rx2 * y ){
	    		setEllipsePoint.call(this, xc, yc, x, y);
	    		
	    		x++;
	    		if( p < 0 ){
	    			p += 4 * ry2 * (2 * x + 1);
	    		}
	    		else{
	    			y--;
	    			p += 4 * ry2 * (2 * x + 1) - 4 * rx2 * 2 * y;
	    		}
	    	}
	    	
	    	x = rx;
	    	y = 0;
	    	p = 4 * rx2 - ry2 * (4 * rx - 1);
	    	
	    	while( rx2 * y <= ry2 * x ){
	    		setEllipsePoint.call(this, xc, yc, x, y);
	    		
	    		y++;
	    		if( p < 0 ){
	    			p += 4 * rx2 * (2 * y + 1);
	    		}
	    		else {
	    			x--;
	    			p += 4 * rx2 * (2 * y + 1) - 4 * ry2 * 2 * x;
	    		}
	    	}
	}
	
	/**
	 * 1/8타원 나머지를 그려주는 midPointEllipse helpler 함수.
	 * @param {int} xc 타원의 중심 x값.
	 * @param {int} yc 타원의 중심 y값.
	 * @param {int} x  1/16타원을 그릴 점 x값.
	 * @param {int} y  1/16타원을 그릴 점 y값.
	 */
	
	function setEllipsePoint(xc, yc, x, y){
		this.setPixel(xc + x, yc + y);
		if( x === 0 ){
			this.setPixel(xc , yc - y);
	    	}
	    	else if( y === 0 ){
	    		this.setPixel(xc - x, yc );
	    	}
	    	else{
	    		this.setPixel(xc + x, yc - y);
	    		this.setPixel(xc - x, yc + y);
	    		this.setPixel(xc - x, yc - y);
		}
	}
return midPointEllipse;
})();
// Source: temp/method/midPointEllipseSolid.js
var midPointEllipseSolid = (function(){

	/* exported midPointEllipseSolid */
	
	/**
	 * MidPoint Ellipse Algorithm 을 구현한 메소드
	 * @method WebGL.prototype.midPointEllipseSolid
	 * @param  {int} xc 타원의 중심 x값.
	 * @param  {int} yc 타원의 중심 y값.
	 * @param  {int} rx 타원의 x축 반지름
	 * @param  {int} ry 타원의 y축 반지름
	 * @return {WebGL}
	 */
	function midPointEllipseSolid(xc, yc, rx, ry){
		var p, x, y;
	    	
	    	var rx2 = Math.pow(rx, 2);
	    	var ry2 = Math.pow(ry, 2);
	    	
	    	x = 0;
	    	y = ry;
	    	p = 4 * ry2 - rx2 * (4 * ry - 1);
	    	
	    	while( ry2 * x <= rx2 * y ){
	    		setEllipsePointSolid.call(this, xc, yc, x, y, p);
	    		
	    		x++;
	    		if( p < 0 ){
	    			p += 4 * ry2 * (2 * x + 1);
	    		}
	    		else{
	    			y--;
	    			p += 4 * ry2 * (2 * x + 1) - 4 * rx2 * 2 * y;
	    		}
	    	}
	    	
	    	x = rx;
	    	y = 0;
	    	p = 4 * rx2 - ry2 * (4 * rx - 1);
	    	
	    	while( rx2 * y <= ry2 * x ){
	    		setEllipsePointSolid.call(this, xc, yc, x, y, 1);
	    		
	    		y++;
	    		if( p < 0 ){
	    			p += 4 * rx2 * (2 * y + 1);
	    		}
	    		else {
	    			x--;
	    			p += 4 * rx2 * (2 * y + 1) - 4 * ry2 * 2 * x;
	    		}
	    	}
	}
	
	/**
	 * 1/8타원 나머지를 그려주는 midPointEllipseSolid helpler 함수.
	 * @method WebGL.prototype.setEllipsePointSolid
	 * @private
	 * @param {int} xc 타원의 중심 x값.
	 * @param {int} yc 타원의 중심 y값.
	 * @param {int} x  1/16타원을 그릴 점 x값.
	 * @param {int} y  1/16타원을 그릴 점 y값.
	 * @param {int} pmode 양수면 선까지 잇고 음수면 점만 찍는다.
	 */
	
	function setEllipsePointSolid(xc, yc, x, y, pmode){
		if( x === 0 ){
	        this.setPixel(xc + x, yc + y);
	        this.setPixel(xc + x, yc - y);
	    }
	    if( y === 0 ){
	        this.midPointLine(xc - x, yc + y, xc + x, yc + y);
	    }
	    else if(pmode < 0){
	        this.setPixel(xc + x, yc + y);
	        this.setPixel(xc + x, yc - y);
	        this.setPixel(xc - x, yc + y);
	        this.setPixel(xc - x, yc - y);
	    }
	    else{
	        this.midPointLine(xc - x, yc + y, xc + x, yc + y);
	        this.midPointLine(xc - x, yc - y, xc + x, yc - y);
	    }
	}
return midPointEllipseSolid;
})();
// Source: temp/method/midPointLine.js
var midPointLine = (function(){

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
return midPointLine;
})();
// Source: temp/method/setPixel.js
var setPixel = (function(){

	/**
	 * 점을 찍는 메소드.
	 * @method WebGL.prototype.setPixel
	 * @param {int} x x좌표값
	 * @param {int} y y좌표값
	 * @return {WebGL}
	 */
	
	/* exported setPixel */
	function setPixel(x, y){
		this.ctx.fillRect(x, this.height - y, 1, 1);
		return this;
	}
return setPixel;
})();
// Source: temp/method/update.js
var update = (function(){

	/* exported update */
	
	/**
	 * cash에 저장된 data를 이용하여 canvas에 그린다.
	 * @method WebGL.prototype.update
	 * @return {WebGL}
	 */
	function update(){
		this.ctx.save();
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.ctx.restore();
	
		var layers = this.layers;
		var len = layers.length;
		var i ;
		var layer;
	
		for( i = 0 ; i < len ; i++) {
			layer = layers[i];
			this.ctx.drawImage(layer.canvas , layer.x, layer.y);
		}
	
		return this;
	}
return update;
})();
// Source: temp/WebGL.js
var WebGL = (function(){

	 
	/**
	 * 책 보고 구현해보는 openGL.
	 * @class WebGL
	 * @param {Element} canvas canvas element
	 * @param {Number} [x=0]      start x
	 * @param {Number} [y=0]      start y
	 * @param {Number} [width=canvas.width]  width
	 * @param {Number} [height=canvas.width]  height
	 * @returns {WebGL}
	 */
	function WebGL(canvas, x, y, width, height){
		if( canvas === undefined ){
			throw new Error();
		}
		/**
		 * start x
		 * @type {Number}
		 */
		this.x = ( x === undefined ) ? 0 : x;
		/**
		 * start y
		 * @type {Number}
		 */
		this.y = ( y === undefined ) ? 0 : y;
		/**
		 * width
		 * @type {Number}
		 */
		this.width = ( width === undefined ) ? canvas.width : width;
		/**
		 * height
		 * @type {Number}
		 */
		this.height = ( height === undefined ) ? canvas.height : height;
		/**
		 * canvas context
		 * @member WebGL.prototype.ctx
		 * @type {Object}
		 */
		this.ctx = canvas.getContext('2d');
		/**
		 * canvas element
		 * @member WebGL.prototype.canvas
		 * @type {Element}
		 */
		this.canvas = canvas;
		/**
		 * sub WebGL.
		 * @member WebGL.prototype.layers
		 * @type {WebGLArray}
		 */
		this.layers = [];
		/**
		 * parent WebGL's layers index
		 * @member WebGL.prototype.index
		 * @type {Number}
		 */
		this.index = -1;
	}
	
	/* exported WebGL */
	/* jshint ignore:start */
	WebGL.prototype.clear					= clear;
	WebGL.prototype.getLayer				= getLayer;
	WebGL.prototype.update					= update;
	
	WebGL.prototype.setPixel					= setPixel;
	WebGL.prototype.DDALine				= DDALine;
	WebGL.prototype.BHLine					= BHLine;
	WebGL.prototype.midPointLine			= midPointLine;
	WebGL.prototype.midPointCircle			= midPointCircle;
	WebGL.prototype.midPointCircleSolid		= midPointCircleSolid;
	WebGL.prototype.midPointEllipse			= midPointEllipse;
	WebGL.prototype.midPointEllipseSolid	= midPointEllipseSolid;
	
	/* jshint ignore:end */
return WebGL;
})();
return WebGL;
}));