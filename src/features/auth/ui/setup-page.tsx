import SetupForm from "./forms/setup-form";

function SetupPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 shadow-sm sticky top-0 bg-background">
        <h1 className="text-xl font-bold">Jewellery Shop Manager</h1>
      </div>
      <main className="flex-1 flex-center">
        <SetupForm />
      </main>
    </div>
  );
}

export default SetupPage;
