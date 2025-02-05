let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let p3 = document.getElementById("p3");
let div = document.getElementById("div");
let p4 = document.getElementById("p4");
const parrafosDiv = div.querySelectorAll("p");

//Click
/* p1.addEventListener("click", function () {
    alert("Has hecho click en el P1");
  });
  p2.addEventListener("click", function () {
    alert("Has hecho click en el P2");
  });
  p3.addEventListener("click", function () {
    alert("Has hecho click en el P3");
  });
  div.addEventListener("click", function () {
    alert("Has hecho click en el Div");
  });

  for (let p of parrafosDiv) {
    p.addEventListener("click", function anadeTexto() {
      p4.innerText = p.innerHTML;

      //debe eliminarse el evento para que no se repita solamente en el parrafo 3
      if (p.id === "p3") {
        p.removeEventListener("click", anadeTexto);
        console.log("Se ha eliminado el evento");
      }
    });
  }*/

//MouesEnter y MouseLeave
for (let p of parrafosDiv) {
  /*
  if (p.id === "p1") {
    p.addEventListener("moueseenter", function entraP1() {
      console.log("Entra en P1");
    });
    p.addEventListener("moueseleave", function saleP1() {
      console.log("Sale de P1");
    });
  } else {
    if (p.id === "p2") {
      p.addEventListener("moueseenter", function entraP2() {
        console.log("Entra en P2");
      });
      p.addEventListener("moueseleave", function saleP2() {
        console.log("Sale de P2");
      });
    } else {
      if (p.id === "p3") {
        p.addEventListener("moueseenter", function entraP3() {
          console.log("Entra en P3");
        });
        p.addEventListener("moueseleave", function saleP3() {
          console.log("Sale de P3");
        });
      }
    }
  }
}*/
  p.addEventListener("mouseenter", function entraP() {
    console.log("Entra en " + p.id);
  });
  p.addEventListener("mouseleave", function saleP() {
    console.log("Sale de " + p.id);
  });
}