(function () {
  const baseURL = "https://basic-todo-api.vercel.app/api/todo";
  const input = document.querySelector("input");
  const rootelm = document.querySelector(".rootelm");
  const loading = document.querySelector(".loading");

  function fetchTodo(url = baseURL, method, data) {
    loading.classList.add("visible");
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Something went wrong ${response.status}`);
        }
        return response.json();
      })
      .then((value) => createUI(value.todos))
      .catch((error) => (rootelm.innerHTML = `${error}`))
      .finally(() => loading.classList.remove("visible"));
  }

  function createUI(todos) {
    rootelm.innerHTML = "";
    todos.forEach((todo) => {
      let li = document.createElement("li");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.isCompleted;
      checkbox.addEventListener("input", () => {
        handleToggle(todo._id, todo.isCompleted);
      });

      let span = document.createElement("span");
      span.innerText = todo.title;
      if (todo.isCompleted) {
        span.style.textDecoration = "line-through";
        span.style.color = "lightgrey";
      } else {
        span.addEventListener("dblclick", (event) => {
          handleEdit(event, todo._id);
        });
      }

      let i = document.createElement("i");
      i.classList.add("fa-solid");
      i.classList.add("fa-xmark");
      i.style.visibility = "visible";
      i.addEventListener("click", () => {
        handleDelete(todo._id);
      });

      li.append(checkbox, span, i);

      rootelm.append(li);
    });
  }

  function data(isCompleted = false, title) {
    return {
      todo: {
        title: title,
        isCompleted: isCompleted,
      },
    };
  }
  function handleToggle(id, status) {
    fetchTodo(baseURL + "/" + id, "PUT", data(!status));
  }
  function handleDelete(id) {
    fetchTodo(baseURL + "/" + id, "DELETE");
  }
  function handleEdit(e, id) {
    let editInput = document.createElement("input");
    editInput.type = "text";
    let parent = e.target.parentElement;
    parent.replaceChild(editInput, e.target);
    editInput.value = e.target.innerText;
    editInput.addEventListener("keyup", (event) => {
      if (event.keyCode === 13 && event.target.value !== "") {
        fetchTodo(baseURL + "/" + id, "PUT", data(false, event.target.value));
      }
    });
  }
  function handleInput(event) {
    let value = event.target.value;
    if (event.keyCode === 13 && value !== "") {
      let todo = data(false, value);
      fetchTodo(baseURL, "POST", todo);
      event.target.value = "";
      fetchTodo(baseURL, "GET");
    }
  }
  input.addEventListener("keyup", handleInput);
  fetchTodo(baseURL, "GET");
})();
