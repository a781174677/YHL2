const crypto =require('crypto');
module.exports =(str) =>{
	const hmac =crypto.createHmac('sha512','yyyyyy')
	hmac.update('aaaa')
	return hmac.digest('hex')
}