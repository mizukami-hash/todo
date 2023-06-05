"use strict";

{
  // 　表
  const table = document.querySelector("table");
  // todo
  const todo = document.querySelector("#todo");
  // 優先度
  const priority = document.querySelector("select");
  // 締め切り
  const deadline = document.querySelector('input[type ="date"]');
  // 登録ボタン
  const submit = document.querySelector("#submit");

  // 登録ボタンクリック時のイベント

  submit.addEventListener("click", () => {
    // 1行ごとの入力項目を入れるオブジェクトを作って値を代入
    const items = {};

    // 未入力の時はダミー、今日の日付が入る

    if (todo.value != "") {
      items.todo = todo.value;
    } else {
      items.todo = "未入力";
    }
    items.priority = priority.value;
    if (deadline.value != "") {
      items.deadline = deadline.value;
    } else {
      items.deadline = new Date().toLocaleDateString().replace(/\//g, "-");
    }
    items.done = false;

    // リセット
    todo.value = "";
    priority.value = "普";
    deadline.value = "";
    todo.focus();

    // trを作成・追加

    const tr = document.createElement("tr");

    // tdを作成、itemsのdone項目に来た時だけチェックボックスを作成
    for (const prop in items) {
      const td = document.createElement("td");
      if (prop == "done") {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = items[prop];
        td.appendChild(checkbox);
      } else {
        td.textContent = items[prop];
      }

      tr.appendChild(td);
    }
    table.appendChild(tr);
  });


  // if ("done" == true){
  //   done.style=

  // }
}
