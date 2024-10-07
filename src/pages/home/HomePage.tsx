import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <main>
      <Helmet>
        <title>Welcome to Self Dictionary</title>
      </Helmet>

      <h1>Hello from the Home page.</h1>
    </main>
  );
}
