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