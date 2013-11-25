/*
	simpleTCPclient.js
	(c) 2013 Sam Caldwell.  All Rights Reserved.
		
	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	the Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
	FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
	COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
	IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	Documentation:
	
		https://github.com/x684867/simpleTCPserver/wiki
 
 */
module.exports=function(){
	net=require('net');
	/**/
	var currServers=Array();
	/* 
		createConnection establishes a persistent TCP connection with an identified host.
	 */
	this.addServer=function(addr,port){
		var server=net.createServer(function(sock){
			var rBuff=Array();
			var wBuff=Array();
			var boolHasConnection=false;
			wInt=setInterval(function(){if(wBuff.length>0) sock.write(wBuff.shift);},10);

			sock.on('data',function(data){rBuff.push(data);});
			sock.on('end',function(data){rBuff.push(data);});
			sock.on('close',function(data){rBuff.push(data);});
			sock.on('error',functoin(e){console.log(e);});

			console.log('Inbound connection from '+sock.remoteAddress+":"+sock.remotePort);
		});
		currServers.push(server);
		
		server.on('error',function(e){console.log(e);boolHasConnection=false;});
		server.on('connection',function(){boolHasConnection=true;});
		server.on('close',function(){boolHasConnection=false;});

		server.listen(port,addr,function(){console.log('server [id:'+currServers.length-1+'] is listening.');});

		server.send=function(m){wBuff.push(base64encode(m));}
		server.read=function(){if(rBuff.length>0) return base64decode(rBuff.shift());}
		
		server.hasResponse=function(){return (rBuff.length>0)?true:false;}
		server.hasConnection=function(){return boolHasConnection;}
		
		server.rQueueLen=function(){return rBuff.length;}
		server.wQueueLen=function(){return wBuff.length;}
		return server;
	}
	/**/
	this.getConnection=function(id){return currConnections[id];}
	/**/
	this.dropConnection=function(id){
		while(server.getConnections()){
			console.log("dropConnection(): count="+server.getConnections());
		}
		currConnections[id].destroy();
		currConnections[id].close();
		currConnections.delete[id];
	}
}
base64encode=function(s){return (new Buffer(s).toString('base64');}
base64decode=function(s){return (new Buffer(s,'base64').toString('utf8');}
