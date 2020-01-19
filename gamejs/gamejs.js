var THREEx	= THREEx || {};

gamejsChar	= function(skinUrl){
	skinUrl	= skinUrl || ("texture.png")
	var texture	= THREE.ImageUtils.loadTexture( skinUrl );
	texture.magFilter	= THREE.NearestFilter;
	texture.minFilter	= THREE.NearestFilter;
	this.texture	= texture

	var material	= new gamejsChar.defaultMaterial({
		map	: texture
	});
	var materialTran= new gamejsChar.defaultMaterial({
		map		: texture,
		transparent	: true,
		depthWrite	: false,
		side		: THREE.DoubleSide
	})

	//		Tamanhos
	var sizes	= {};
	sizes.charH	= 1;
	sizes.pixRatio	= 1/32;

	sizes.headH	=  8 * sizes.pixRatio;
	sizes.headW	=  8 * sizes.pixRatio;
	sizes.headD	=  8 * sizes.pixRatio;

	sizes.helmetH	=  9 * sizes.pixRatio;
	sizes.helmetW	=  9 * sizes.pixRatio;
	sizes.helmetD	=  9 * sizes.pixRatio;

	sizes.bodyH	= 12 * sizes.pixRatio;
	sizes.bodyW	=  8 * sizes.pixRatio;
	sizes.bodyD	=  4 * sizes.pixRatio;

	sizes.legH	= 12 * sizes.pixRatio;
	sizes.legW	=  4 * sizes.pixRatio;
	sizes.legD	=  4 * sizes.pixRatio;

	// - 2 pernas
	// - tamanho do personagem
	var model	= this;
	model.root	= new THREE.Object3D;

	var group	= new THREE.Object3D()
	group.position.y= sizes.charH - sizes.headH	
	model.headGroup	= group
	model.root.add(model.headGroup)

	// cabeça
	var geometry	= new THREE.CubeGeometry(sizes.headW, sizes.headH, sizes.headD)
	mapUv(geometry, 0, 16, 24, 24, 16)	// esquerda
	mapUv(geometry, 1,  0, 24,  8, 16)	// direita
	mapUv(geometry, 2,  8, 32, 16, 24)	// cima
	mapUv(geometry, 3, 16, 32, 24, 24)	// embaixo
	mapUv(geometry, 4,  8, 24, 16, 16)	// na frente
	mapUv(geometry, 5, 24, 24, 32, 16)	// atras
	var mesh	= new THREE.Mesh(geometry, material)
	mesh.position.y	= sizes.headH/2
	model.head	= mesh
	model.headGroup.add(model.head)

	
	// corpo
	var geometry	= new THREE.CubeGeometry(sizes.bodyW, sizes.bodyH, sizes.bodyD)
	model.body	= new THREE.Mesh(geometry, material)
	model.root.add(model.body)
	model.body.position.y	= sizes.legH + sizes.bodyH/2
	mapUv(geometry, 0, 28, 12, 32,  0)	// esquerda
	mapUv(geometry, 1, 16, 12, 20,  0)	// direita
	mapUv(geometry, 2, 20, 16, 28, 12)	// cima
	mapUv(geometry, 3, 28, 16, 32, 12)	// embaixo
	mapUv(geometry, 4, 20, 12, 28,  0)	// na frente
	mapUv(geometry, 5, 32, 12, 40,  0)	// atras

	return
	
	function mapUv(geometry, faceIdx, x1, y1, x2, y2){
		var tileUvW	= 1/64;
		var tileUvH	= 1/32;
		if( geometry.faces[faceIdx] instanceof THREE.Face3 ){
			var UVs		= geometry.faceVertexUvs[0][faceIdx * 2];
			UVs[0].x = x1 * tileUvW;	UVs[0].y = y1 * tileUvH;
			UVs[1].x = x1 * tileUvW;	UVs[1].y = y2 * tileUvH;
			UVs[2].x = x2 * tileUvW;	UVs[2].y = y1 * tileUvH;
			 
			var UVs		= geometry.faceVertexUvs[0][faceIdx * 2 + 1];
			UVs[0].x = x1 * tileUvW;	UVs[0].y = y2 * tileUvH;
			UVs[1].x = x2 * tileUvW;	UVs[1].y = y2 * tileUvH;
			UVs[2].x = x2 * tileUvW;	UVs[2].y = y1 * tileUvH;			
		}else if( geometry.faces[faceIdx] instanceof THREE.Face4 ){
			var UVs                = geometry.faceVertexUvs[0][faceIdx];
			UVs[0].x = x1 * tileUvW;        UVs[0].y = y1 * tileUvH;
			UVs[1].x = x1 * tileUvW;        UVs[1].y = y2 * tileUvH;
			UVs[2].x = x2 * tileUvW;        UVs[2].y = y2 * tileUvH;
			UVs[3].x = x2 * tileUvW;        UVs[3].y = y1 * tileUvH;   			
		}else	console.assert(false)
	}
}


gamejsChar.baseUrl	= '/'
gamejsChar.defaultMaterial	= THREE.MeshBasicMaterial


gamejsChar.prototype.loadSkin	= function(url, onLoad){
	var image	= new Image();
	image.onload	= function () {
		this.texture.image		= image;
		this.texture.needsUpdate	= true;
		onLoad	&& onLoad(this)
	}.bind(this);
	image.src = url;
	return this;
}

gamejsChar.prototype.loadWellKnownSkin	= function(name, onLoad){
	console.assert(gamejsChar.skinWellKnownUrls[name])
	var url	= gamejsChar.baseUrl + gamejsChar.skinWellKnownUrls[name];
	return this.loadSkin(url, onLoad)
}

