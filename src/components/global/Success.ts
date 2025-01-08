import { DotLottie } from '@lottiefiles/dotlottie-web';

export const DotLottieSuccess=()=>{
    const canvas = document.querySelector('#dotlottie-canvas') as HTMLCanvasElement | null;

if (canvas) {
  const dotLottie = new DotLottie({
    autoplay: true,
    loop: false,
    canvas: canvas, 
    src: "https://lottie.host/9973fb54-4d95-4072-a85c-63755609ec8d/ID33WhVfcO.json", 
  });
} else {
  console.error("Canvas element not found");
}
}
