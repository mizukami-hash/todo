"use strict";

{
  const addTaskBtn = document.querySelector("#addBtn");
  const textarea = document.querySelector("#text");
  const deleteBtn = document.querySelector("#deleteBtn");
  let states = false;

  let dataList = [];
  const saveTodos = () => {
    if (textarea.value.trim() ===""){
      return;
    };
    localStorage.setItem("task", JSON.stringify(dataList));
  };

  if (localStorage.getItem("task") === null) {
    dataList = [];
  } else {
    dataList = JSON.parse(localStorage.getItem("task"));
  }
console.log(dataList);



  // li要素を追加
  addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let dataObj = {};
    dataObj.id = new Date().getTime();
    dataObj.isCompleted = false;
    dataObj.date = new Date().toLocaleString("ja-JP-u-ca-japanese"),
    dataObj.content = textarea.value;
    dataList.push(dataObj);
    localStorage.task = JSON.stringify(dataList);

    // リストに要素を追加
    if (textarea.value.trim() === "") return;
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.checked = dataObj.isCompleted;

    checkbox.addEventListener("change", () => {
      dataList.forEach((item) => {
        if (item.id === dataObj.id) {
          item.isCompleted = !item.isCompleted;
        }
      });
      saveTodos();
    });
    const p = document.createElement("p");
    p.textContent = textarea.value;
    const label = document.createElement("label");
    label.appendChild(checkbox);
    label.appendChild(p);
    const xButton = document.createElement("button");
    xButton.textContent = "x";
    xButton.classList.add("xBtn");
    checkbox.classList.add("checkbox");
    checkbox.type = "checkbox";
    checkbox.name = "tasks";
    
    li.appendChild(label);
    li.appendChild(xButton);
    
    const ul = document.querySelector("#taskList");
    ul.appendChild(li);
    textarea.value = "";
  });

  function deleteRow() {
    const checkedList = document.querySelectorAll("input[name =tasks]:checked");
    console.log(checkedList);
    if (checkedList.length === 0) {
      return;
    }
    if (!confirm("削除しますか？")) {
      return;
    }
    checkedList.forEach((check) => check.closest("li").remove());
  }
  // 削除
  deleteBtn.addEventListener("click", () => {
    deleteRow();
  });


  

}
