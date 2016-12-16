!function(w, d){'use strict'


	// Default settings
	window.dev = {
		showStage: false
	}
	window.config = {}
	var _config = {
			captureDelay: 2000,
			format: 'png',

			frequency: .03,
			octaves: 3,
			seed: 46
		}


	// Show dev tools on load
	g.gui.Window.get().showDevTools()


	// Bind
	Object.keys(_config).forEach(function(key) {
		var els = d.querySelectorAll('[name="' + key + '"]')
		if(els.length){
			g.bindEls[key] = els
			for(var i = els.length; i--;){
				els[i].value = _config[key]
				els[i].addEventListener('change', bindChange)
			}
		}
		Object.defineProperty(config, key, {
			set: function(newValue){

				if(newValue === _config[key]){
					return
				}

				// If changing SVG settings
				if(key === 'frequency'){
					g.previewAnim.setAttribute('baseFrequency', config.frequency)
				}
				else if(key === 'octaves'){
					g.previewAnim.setAttribute('baseFrequency', config.octaves)
				}
				else if(key === 'seed'){
					g.previewAnim.setAttribute('baseFrequency', config.seed)
				}

				if(key in g.bindEls){
					for(var i = g.bindEls[key].length; i--;){
						if(g.bindEls[key][i].value !== newValue){
							g.bindEls[key][i].value = newValue
						}
					}
				}
				_config[key] = newValue
				localStorage.config = JSON.stringify(_config)
			},
			get: function(){
				return _config[key]
			}
		})


	})
	function bindChange(){
		config[this.name] = this.value
	}


	// Use stored settings
	if(localStorage.config){
		var jsonConfig = JSON.parse(localStorage.config)
		for(var i in jsonConfig){
			config[i] = jsonConfig[i]
		}
	}







	// Load images on drag & drop
	window.ondragover = function(e) { e.preventDefault(); return false };
	window.ondrop = function(e){
		e.preventDefault()

		var file = e.dataTransfer.files[0].path,
			name = 'temp.' + file.split('.').pop()

		copyFile(file, g.dir + '/' + name, loadImg.bind(null, name))

		return false
	}
	function loadImg(name){
		console.log(name)
		g.inputImg.src = name
		g.hiddenImg.src = name
	}



	// When image loads, load preview
	g.hiddenImg.onload = function(){
		console.log(this.width)
		processFilters(g.previewSvg, g.previewAnim, g.previewImg, this.src, this.width, this.height, true)
		//g.snapShot(this.src, this.width, this.height)
	}


	function processFilters(targetSvg, targetAnim, targetImg, img, width, height, preview){
		console.log('Processing image and filters...')

		if(!preview){
			targetAnim.setAttribute('baseFrequency', config.frequency)
			targetAnim.setAttribute('numOctaves', config.octaves)
			targetAnim.setAttribute('seed', config.seed)
		}

		targetSvg.setAttribute('viewBox', '0 0 ' + width + ' ' + height)
		if(!preview){
			targetSvg.setAttribute('width', width)
			targetSvg.setAttribute('height', height)
		}

		targetImg.setAttribute('xlink:href', img)
		targetImg.setAttribute('width', width)
		targetImg.setAttribute('height', height)
	}



	// Copy file to working directory
	function copyFile(source, target, cb) {
		var cbCalled = false

		var rd = g.fs.createReadStream(source)
			rd.on("error", function(err) {
			done(err)
		})
		var wr = g.fs.createWriteStream(target)
		wr.on("error", function(err) {
			done(err)
		})
		wr.on("close", function(ex) {
			done()
		})
		rd.pipe(wr)

		function done(err) {
			if (!cbCalled) {
				cb(err)
				cbCalled = true
			}
		}
	}

	/*
	window.addEventListener('click', function(){
		location.reload()
	})
	*/







}(window, document)