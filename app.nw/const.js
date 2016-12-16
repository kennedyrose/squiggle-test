!function(w, d){'use strict'
	console.log('const.js loaded')
	window.g = {
		gui: require('nw.gui'),
		fs: require('fs'),
		dir: global.__dirname,
		inputImg: d.getElementById('input'),
		previewSvg: d.getElementById('previewSvg'),
		previewAnim: d.getElementById('previewAnim'),
		previewImg: d.getElementById('previewImg'),
		hiddenImg: d.createElement('img'),
		bindEls: {}
	}
	g.win = g.gui.Window.get()

}(window, document)