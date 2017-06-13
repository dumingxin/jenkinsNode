const qr=require('qr-image')
const  args = process.argv.splice(2);
const filePath=args[0]
const distPath=args[1]
// console.log(filePath)
const img=qr.image(filePath,{size:5})
img.pipe(require('fs').createWriteStream(distPath));
