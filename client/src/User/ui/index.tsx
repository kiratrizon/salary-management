import { useState } from "react";
import { fetchData } from "../../tools/globalfunctions";

type Entity = "user" | "admin";

interface IEntity {
  entity?: Entity;
}

export const Login = ({ entity = "user" }: IEntity) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email && password) {
      const [error, data] = await fetchData({
        url: `/api/${entity}/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          email,
          password,
        },
      });

      if (!error && data) {
        console.log("Login successful:", data);
        // localStorage.setItem(`${entity}Token`, data.data.token);
        // Redirect or update state as needed
      } else {
        console.error("Login failed:", data);
      }
    }
  };

  return (
    <>
      <h1>Login {entity}</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};
