// Deterministic vector composition; QR is generated locally, never by an image model.
const fs=require('node:fs');
const path=require('node:path');
const QRCode=require('qrcode');
const sharp=require('sharp');
const root=path.resolve(__dirname,'..');
const out=path.join(root,'assets');
const url='https://7eot4.github.io/CODEX-19-zakon-czarnego-kalu/';
const qr=QRCode.create(url,{errorCorrectionLevel:'Q'});
const cells=qr.modules.size+8;
let qrPath='';
for(let y=0;y<qr.modules.size;y++)for(let x=0;x<qr.modules.size;x++){
  if(qr.modules.get(y,x))qrPath+=`M${x+4} ${y+4}h1v1h-1z`;
}
const qrSVG=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${cells} ${cells}"><rect width="${cells}" height="${cells}" fill="#fff"/><path d="${qrPath}" fill="#000"/></svg>`;
fs.writeFileSync(path.join(out,'qr-strona.svg'),qrSVG);
const logo=fs.readFileSync(path.join(out,'logo.png')).toString('base64');
const palette={bg:'#0c0e0f',panel:'#121719',ink:'#e8edf0',muted:'#a6b4bd',line:'#3a464d',silver:'#c2cfd6'};
function text(x,y,value,size=24,extra=''){
  return `<text x="${x}" y="${y}" fill="${palette.ink}" font-family="Arial,sans-serif" font-size="${size}" ${extra}>${value}</text>`;
}
function heading(x,y,value,size){return text(x,y,value,size).replace('font-family="Arial,sans-serif"','font-family="Georgia,serif"')}
function emblem(x,y,size){return `<image x="${x}" y="${y}" width="${size}" height="${size}" href="data:image/png;base64,${logo}" filter="url(#silver-logo)" clip-path="url(#logo-clip)"/>`}
function qrAt(x,y,size){return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="0 0 ${cells} ${cells}" shape-rendering="crispEdges"><rect width="${cells}" height="${cells}" fill="#fff"/><path d="${qrPath}" fill="#000"/></svg>`}
function svg(width,height,body,logoBox){
 const [x,y,size]=logoBox;
 return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="title desc"><title id="title">Zakon Czarnego Kału — wizytówka z kodem QR</title><desc id="desc">O to słowo z Gdańska! Kod QR prowadzi do ${url}</desc><defs><filter id="silver-logo" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="table" tableValues="0.86 0.015"/><feFuncG type="table" tableValues="0.89 0.025"/><feFuncB type="table" tableValues="0.91 0.03"/></feComponentTransfer></filter><clipPath id="logo-clip"><circle cx="${x+size/2}" cy="${y+size/2}" r="${size/2}"/></clipPath></defs><rect width="${width}" height="${height}" fill="${palette.bg}"/><rect x="32" y="32" width="${width-64}" height="${height-64}" fill="none" stroke="${palette.line}" stroke-width="2"/>${body}</svg>`;
}
const portraitLogo=[768,130,228];
const portrait=svg(1080,1350,
 text(74,105,'ZCK / NOCNA KAPITUŁA',24,'letter-spacing="4"')+
 emblem(...portraitLogo)+
 heading(68,267,'ZAKON',105)+heading(68,374,'CZARNEGO',105)+heading(65,514,'KAŁU',156)+
 `<path d="M74 577H1006" stroke="${palette.line}" stroke-width="2"/>`+
 text(74,632,'MAKSYMA ZAKONU',19,'letter-spacing="4"')+
 heading(72,697,'O to słowo z Gdańska!',47)+
 text(74,746,'Mrok jest wieczny. Wstyd odwołano.',27)+
 text(74,886,'WEJDŹ',42,'letter-spacing="2"')+
 text(74,943,'DO KRONIKI.',42,'letter-spacing="2"')+
 text(74,1007,'Zeskanuj kod QR',25)+text(74,1046,'i poznaj Zakon.',25)+
 qrAt(640,825,cells*8)+
 `<path d="M74 1193H1006" stroke="${palette.line}"/>`+
 text(74,1240,'7eot4.github.io/',23)+text(74,1279,'CODEX-19-zakon-czarnego-kalu/',23)+
 text(1006,1279,'AD MMXXVI',19,'text-anchor="end" letter-spacing="2"'),portraitLogo);
const landscapeLogo=[1262,100,310];
const landscape=svg(1700,1100,
 text(90,113,'ZCK / NOCNA KAPITUŁA',28,'letter-spacing="5"')+
 emblem(...landscapeLogo)+
 heading(82,294,'ZAKON',139)+heading(82,435,'CZARNEGO',139)+heading(78,605,'KAŁU',185)+
 `<path d="M90 672H1060" stroke="${palette.line}" stroke-width="2"/>`+
 text(90,727,'MAKSYMA ZAKONU',22,'letter-spacing="4"')+
 heading(87,802,'O to słowo z Gdańska!',58)+
 text(90,858,'Mrok jest wieczny. Wstyd odwołano.',30)+
 text(1208,489,'WEJDŹ DO KRONIKI',24,'letter-spacing="2"')+
 qrAt(1208,531,cells*9)+
 text(1208,1011,'ZESKANUJ KOD QR',24,'letter-spacing="2"')+
 text(90,998,'7eot4.github.io/CODEX-19-zakon-czarnego-kalu/',25),landscapeLogo);
async function generate(){
 fs.writeFileSync(path.join(out,'zck-whatsapp.svg'),portrait);
 fs.writeFileSync(path.join(out,'wizytowka.svg'),landscape.replace('width="1700" height="1100"','width="85mm" height="55mm"'));
 await sharp(Buffer.from(portrait)).png().toFile(path.join(out,'zck-whatsapp.png'));
 await sharp(Buffer.from(portrait)).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toFile(path.join(out,'zck-whatsapp.jpg'));
 await sharp(Buffer.from(landscape)).withMetadata({density:508}).png().toFile(path.join(out,'wizytowka.png'));
 console.log(JSON.stringify({url,qrModules:qr.modules.size,quietZone:4,portrait:[1080,1350],landscape:[1700,1100]}));
}
generate().catch(error=>{console.error(error);process.exit(1)});
