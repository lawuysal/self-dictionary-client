export default function NotFoundPage() {
  return (
    <main className="mx-auto mt-40 flex flex-col items-center gap-8 transition-all duration-300 ease-in-out">
      <h1 className="font-playfair text-4xl font-bold text-primary md:text-6xl">
        <span className="font-sans text-foreground">404 </span> Not Found
      </h1>
      <p className="font-playfair">
        Sorry, the page you are looking for does not exist.
      </p>
    </main>
  );
}
