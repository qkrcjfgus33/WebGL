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