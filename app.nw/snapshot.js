!function(w, d){'use strict'

	


	// Create stage window and events
	var stageWin,
		stageDoc
	g.gui.Window.open('stage.html', {
		show: dev.showStage
	}, function(win){
		console.log('Stage window created')
		stageWin = win
		stageDoc = win.window.document
		stageDoc.addEventListener("DOMContentLoaded", stageLoaded)


	})
	function stageLoaded(){
		g.turbulence = stageDoc.getElementById('turbulence')
		g.settings = g.turbulence.querySelector('feTurbulence')
		g.anim = stageDoc.getElementById('anim')
		g.stageImg = stageDoc.getElementById('stageImg')
		g.stageImg.addEventListener('load', stageImgLoad)
		console.log(g.stageImg)
	}
	function stageImgLoad(){
		console.log('Stage image loaded...')
		setTimeout(capturePage, config.captureDelay)
	}



	// Takes snapshots of a url
	function snapShot(img, width, height){
		console.log('Loading image to stage...')
		stageWin.width = width
		stageWin.height = height

		g.settings.setAttribute('baseFrequency', config.frequency)
		g.settings.setAttribute('numOctaves', config.octaves)
		g.settings.setAttribute('seed', config.seed)

		g.anim.setAttribute('viewBox', '0 0 ' + width + ' ' + height)
		g.anim.setAttribute('width', width)
		g.anim.setAttribute('height', height)

		g.stageImg.setAttribute('xlink:href', img)
		g.stageImg.setAttribute('width', width)
		g.stageImg.setAttribute('height', height)
	}
	function capturePage(){
		stageWin.capturePage(function(data){
			console.log('Snapshot successful')
			//console.log(data)
			g.outputImg.src = data

		}, {
			format: config.format,
			datatype: 'datauri'
		})
	}

	g.snapShot = snapShot

}(window, document)