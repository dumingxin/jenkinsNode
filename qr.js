const qr=require('qr-image')
const  args = process.argv.splice(2);
const filePath=args[0]//源文件地址
const distPath=args[1]//目标文件地址
const img=qr.image(filePath,{size:5})//生成二维码图片
img.pipe(require('fs').createWriteStream(distPath));//保存图片
