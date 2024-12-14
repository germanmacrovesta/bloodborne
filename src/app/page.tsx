import Card from "./Card";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card name="John Doe" title="CEO" since="2010" />
      </main>
      <footer className="">

      </footer>
    </div>
  );
}
