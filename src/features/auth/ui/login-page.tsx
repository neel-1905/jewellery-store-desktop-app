import LoginForm from "./forms/login-form";

function LoginPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 shadow-sm sticky top-0 bg-background">
        <h1 className="text-xl font-bold">Jewellery Shop Manager</h1>
      </div>
      <main className="flex-1 flex-center">
        <LoginForm />
      </main>
    </div>
  );
}

export default LoginPage;
