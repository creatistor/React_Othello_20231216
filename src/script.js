document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".square").forEach(function (square) {
    square.addEventListener("click", clickSquareEvent);
  });
});

function putPiece(targetSquare, owner) {
  targetSquare.textContent = "●";
  targetSquare.setAttribute("data-owner", owner);
  targetSquare.classList.add("selected");
}

function clickSquareEvent(event) {
  let square = event.target;
  putPiece(square, "black");
}
