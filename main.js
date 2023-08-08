"use strict";

{
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const renderTodo = (todo) => {
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = todo.isCompleted;
    input.addEventListener("change", () => {
      // チェックされたときにIDが同じものだけステータスを変更
      todos.forEach((item) => {
        if (item.id === todo.id) {
          item.isCompleted = !item.isCompleted;
        }
      });
      saveTodos();
    });

    const span = document.createElement("span");
    span.textContent = todo.title;
    if (todo.title === "") {
      return;
    }
    const label = document.createElement("label");
    label.appendChild(input);
    label.appendChild(span);
    const removeLi = document.createElement("button");
    removeLi.textContent = "×";

    // リスト一行削除
    removeLi.addEventListener("click", () => {
      if (!confirm("Are you sure you wish to delete the list item?")) {
        return;
      }
      li.remove();
      todos = todos.filter((item) => {
        return item.id !== todo.id;
      });
      saveTodos();
    });
    const li = document.createElement("li");
    li.appendChild(label);
    li.appendChild(removeLi);
    document.querySelector("#todos").appendChild(li);
  };

  const renderTodos = () => {
    todos.forEach((todo) => {
      renderTodo(todo);
    });
  };

  document.querySelector("#add-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#add-form input");

    const todo = {
      id: Date.now(),
      title: input.value,
      isCompleted: false,
    };
    renderTodo(todo);
    todos.push(todo);
    saveTodos();
    input.value = "";
    input.focus();
  });
  // 選択した項目をまとめて削除
  document.querySelector("#purge").addEventListener("click", () => {
    if (!confirm("Are you sure you wish to delete all?")) {
      return;
    }
    todos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });
    saveTodos();
    document.querySelectorAll("#todos li").forEach((li) => {
      li.remove();
    });
    renderTodos(todos);
  });
  // 完了済みのみを表示
  document.querySelector("#comp").addEventListener("click", () => {
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos = todos.filter((todo) => {
      return todo.isCompleted === true;
    });

    const listItems = document.querySelectorAll("li");
    listItems.forEach((item) => {
      item.classList.add("hide");
    });
    renderTodos();
  });
  // 未完了
  document.querySelector("#active").addEventListener("click", () => {
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos = todos.filter((todo) => {
      return todo.isCompleted === false;
    });

    const listItems = document.querySelectorAll("li");
    listItems.forEach((item) => {
      item.classList.add("hide");
    });
    renderTodos();
  });

  document.querySelector("#all").addEventListener("click", () => {
    const listItems = document.querySelectorAll("li");
    listItems.forEach((item) => {
      item.classList.add("hide");
    });
    todos = JSON.parse(localStorage.getItem("todos"));
    renderTodos();
  });

  renderTodos();
}
