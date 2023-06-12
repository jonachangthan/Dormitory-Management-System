// var sure = document.getElementById("sure")

// sure.addEventListener("click", (event) => {
// 	apply.style.display="none"
// })


// let progress = document.getElementById("progress");
// let prev = document.getElementById("prev");
// let next = document.getElementById("next");
// let circles = document.querySelectorAll(".circle");

// let currentStep = 1; //目前步驟

// // 下一步
// next.addEventListener("click", () => {
//   currentStep++;
//   // console.log(currentStep);
//   if (currentStep > circles.length) {
//     currentStep = circles.length;
//   }
//   // console.log(currentStep);
//   update();
// });

// // 上一步
// prev.addEventListener("click", () => {
//   currentStep--;
//   // console.log(currentStep);
//   if (currentStep < 1) {
//     currentStep = 1;
//   }
//   // console.log(currentStep);
//   update();
// });

// // 更新DOM
// function update() {
//   // 圓圈
//   circles.forEach((circleItem, index) => {
//     if (index < currentStep) {
//       circleItem.classList.add("active");
//     } else {
//       circleItem.classList.remove("active");
//     }
//   });

//   // 當前進度的線條
//   let actives = document.querySelectorAll(".active");
//   console.log((actives.length / circles.length) * 100);
//   // progress.style.width = (actives.length / circles.length) * 100 + "%";
//   progress.style.width =
//     ((actives.length - 1) / (circles.length - 1)) * 100 + "%";
//   if (currentStep === 1) {
//     prev.disabled = true;
//   } else if (currentStep === 3) {
//     next.disabled = true;
//   } else {
//     prev.disabled = false;
//     next.disabled = false;
//   }
// }
