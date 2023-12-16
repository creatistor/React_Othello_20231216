import React, { useState } from "react";

const Board = ({ lines }) => {
  // 現在のプレイヤーの色を管理するステート
  const [currentPlayer, setCurrentPlayer] = useState("black");

  const [winner, setWinner] = useState(null);

  // 中央に石を初期配置する
  const [owner, setOwner] = useState(
    Array(lines)
      .fill()
      .map((row, i) =>
        Array(lines)
          .fill(null)
          .map((col, j) => {
            if ((i === 3 && j === 3) || (i === 4 && j === 4)) {
              return "black";
            } else if ((i === 3 && j === 4) || (i === 4 && j === 3)) {
              return "white";
            }
            return null;
          })
      )
  );

  // 方向定義
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1] /* [0, 0] */,

    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const checkWinner = () => {
    let blackCount = 0;
    let whiteCount = 0;
    owner.forEach((row) => {
      row.forEach((cell) => {
        if (cell === "black") {
          blackCount++;
        } else if (cell === "white") {
          whiteCount++;
        }
      });
    });
    if (
      blackCount + whiteCount === lines * lines ||
      blackCount === 0 ||
      whiteCount === 0
    ) {
      // 全てのマスが埋まったか、どちらかのプレイヤーの石がなくなった場合
      setWinner(blackCount > whiteCount ? "black" : "white");
    }
  };

  const flipDiscs = (i, j, currentPlayer, owner) => {
    const discsToFlip = [];

    directions.forEach(([di, dj]) => {
      let x = i + di;
      let y = j + dj;
      const discs = [];

      while (
        x >= 0 &&
        x < lines &&
        y >= 0 &&
        y < lines &&
        owner[x][y] &&
        owner[x][y] !== currentPlayer
      ) {
        discs.push([x, y]);
        x += di;
        y += dj;
      }

      if (
        x >= 0 &&
        x < lines &&
        y >= 0 &&
        y < lines &&
        owner[x][y] === currentPlayer
      ) {
        discsToFlip.push(...discs);
      }
    });

    return discsToFlip;
  };

  // プレイヤーの色を切り替える関数
  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === "black" ? "white" : "black");
  };

  const initialOwnerState = () => {
    return Array(lines)
      .fill()
      .map((_, i) =>
        Array(lines)
          .fill(null)
          .map((__, j) => {
            if ((i === 3 && j === 3) || (i === 4 && j === 4)) {
              return "black";
            } else if ((i === 3 && j === 4) || (i === 4 && j === 3)) {
              return "white";
            }
            return null;
          })
      );
  };

  const handleButtonClick = (i, j) => {
    if (owner[i][j] === null) {
      // クリックされた位置が空いているか確認
      const discsToFlip = flipDiscs(i, j, currentPlayer, owner); // 裏返す石の位置を取得

      if (discsToFlip.length > 0) {
        // 裏返す石がある場合
        setOwner((prevOwners) => {
          const newOwners = prevOwners.map((row) => [...row]);
          newOwners[i][j] = currentPlayer; // クリックされた位置に石を置く
          discsToFlip.forEach(([x, y]) => {
            newOwners[x][y] = currentPlayer; // 裏返す石を現在のプレイヤーの色に変更
          });
          return newOwners;
        });
        changePlayer();
        checkWinner(); // プレイヤーの色を切り替える
      }
    }
  };

  const divlist = [];
  for (let i = 0; i < lines; i++) {
    const row = [];
    for (let j = 0; j < lines; j++) {
      const key = `${i + 1}-${j + 1}`;
      const isBlackCircle = key === "4-4" || key === "5-5";
      const isWhiteCircle = key === "4-5" || key === "5-4";
      const squareClass = `square ${owner[i][j] != null ? "cant-select" : ""}${
        isBlackCircle || isWhiteCircle ? " cant-select" : ""
      }`;

      row.push(
        <button
          key={key}
          className={squareClass}
          data-row={i}
          data-col={j}
          data-owner={owner[i][j]}
          onClick={() => {
            handleButtonClick(i, j);
            // コールバック関数でdata-ownerの中身更新
          }}
        >
          ●
        </button>
      );
    }
    divlist.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }

  return (
    <>
      {winner && (
        <div className={`winner-banner ${winner}`}>
          {winner === "black" ? "黒の勝利！" : "白の勝利！"}
        </div>
      )}
      <div className="board-wrapper">
        <div id="board">{divlist}</div>
      </div>
      <div id="controller">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          id="btn-initialize"
          onClick={() => setOwner(initialOwnerState())}
        >
          RESET
        </button>
      </div>
    </>
  );
};

export default Board;
