import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  // загрузка из localStorage
  useEffect(() => {
    document.title = "Todo App";

    const saved = localStorage.getItem("todos");
    if (saved) {
      const parsed = JSON.parse(saved);

      // поддержка старого формата (массив строк)
      const normalized = parsed.map((todo) =>
        typeof todo === "string"
          ? { text: todo, completed: false }
          : todo
      );

      setTodos(normalized);
    }
  }, []);

  // сохранение в localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // добавить задачу
  const addTodo = () => {
    if (!text.trim()) return;

    setTodos([...todos, { text, completed: false }]);
    setText("");
  };

  // удалить задачу
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // переключить выполнение
  const toggleTodo = (index) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Новое дело"
      />

      <button onClick={addTodo}>Добавить</button>

      {todos.map((todo, index) => (
        <div className="card" key={index}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(index)}
          />

          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              marginLeft: "8px",
              marginRight: "8px"
            }}
          >
            {todo.text}
          </span>

          <button onClick={() => deleteTodo(index)}>Удалить</button>
        </div>
      ))}
    </div>
  );
}

export default App;