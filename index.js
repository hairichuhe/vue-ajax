function json2url(json){
	json.t=Math.random();
	var arr=[];
	for(var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
};

!(function(){
	function install(Vue, options) {

	  // 3. 添加实例方法
	  Vue.prototype.$ajax = function(json){
			json=json || {};
			if(!json.url){
				console.log('url Not Null');
				return;
			};
			json.data=json.data || {};
			json.type=json.type || 'get';

			//ajax
			if(global.XMLHttpRequest){
				var oAjax=new XMLHttpRequest();
			}else{
				var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
			}

			switch(json.type.toLowerCase()){
				case 'get':
				oAjax.open('GET',json.url+'?'+json2url(json.data),true);
				oAjax.send();
				break;
				case 'post':
				oAjax.open('POST',json.url,true);
				oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				oAjax.send(json2url(json.data));
				break;
			}

			// fnLoading()
			json.fnLoading && json.fnLoading();

			oAjax.onreadystatechange=function(){
				if(oAjax.readyState==4){
					json.complete && json.complete();
					if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
						if(json.dataType=='xml'){
							json.success && json.success(oAjax.responseXML);
						}else if(json.dataType=='json'){
							json.success && json.success(JSON.parse(oAjax.responseText));
						}else{
							json.success && json.success(oAjax.responseText);
						}
					}else{
						json.error && json.error(oAjax.status);
					}
				}
			};
		}
	}

	if (typeof exports == "object") {
	    module.exports = install
	} else if (typeof define == "function" && define.amd) {
	    define([], function(){ return install })
	} else if (window.Vue) {
	    Vue.use(install)
	}

})();