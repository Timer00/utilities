export function cameraFollow(x, y, canvasO,ctx) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvasO.width, canvasO.height);
  ctx.translate(-x + canvasO.width / 2, -y + canvasO.height / 2);
}

export function follow(objectToFollow, objectWhoFollow, speed) {
  let dx = objectToFollow.x - objectWhoFollow.x;
  let dy = objectToFollow.y - objectWhoFollow.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  let speedX = (dx / distance) * speed;
  let speedY = (dy / distance) * speed;
  return [speedX, speedY];
}

// calculate distance between two points
export function distBetween (p1, p2) {
  return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2));
}

export function rtd(radians) {
  return (180 / Math.PI) * radians;
}

export function angleBetween(p1, p2) {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
}

//To invert the progression of a number
export function clamp(num, min, max) {
  return num <= min ? min : (num >= max ? max : num);
}

export function smoothstep(edge0, edge1, x) {
  // Scale, bias and saturate x to 0..1 range
  x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  // Evaluate polynomial
  return x * x * (3 - 2 * x);
}

export function collision(a, b, type) {
  if (type === 'touch') {
    return (a.x + a.width > b.x) && (a.x < b.x + b.width) && (a.y + a.height > b.y) && (a.y < b.y + b.height);
  }
  if (type === 'inside') {
    return (a.x > b.x) && (a.x + a.width < b.x + b.width) && (a.y > b.y) && (a.y + a.height < b.y + b.height);
  }
}

export function loadAssets(assetsInput, assetsOutput, functionToLoad) {
  let assetCount = 0;

  let onLoadFn = ()=>{
    assetCount += 1;
    if (assetCount === assetsInput.length) {
      functionToLoad();
    }
  };

  assetsInput.forEach((obj, i) => {
    let asset;
    if (obj.type.image){
      asset = new Image();
      asset.src = obj.src;
      asset.onload = onLoadFn;
    } else {
      asset = document.createElement('audio');
      asset.src = obj.src;
      asset.style.display = "none";
      asset.type = `audio/${obj.type.format}`;
      asset.oncanplaythrough = onLoadFn;
      document.body.appendChild(asset);
    }
    assetsOutput[obj.name] = asset;
  });
}

export function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

  let ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

  return { width: srcWidth*ratio, height: srcHeight*ratio };
}

export function isMobile () {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}
