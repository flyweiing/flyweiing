require.config({
　　baseUrl: "static/js/",

　　paths: {
　　　　 "jquery": "basejs/jquery.min",
　　　   "easyui": "../easyui/jquery.easyui.min"
　　},

	shim: {
		'easyui': {
			deps: ['jquery'],
			exports: 'easyui'
		}
　　},
	
	waitSeconds: 0
});