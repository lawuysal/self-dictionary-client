export default function VerifyYourEmailPage() {
  return (
    <main className="flex min-h-[calc(100svh-68px)] flex-col items-center md:min-h-[calc(100svh-72px)]">
      <div className="mt-2 flex flex-col items-center gap-6 md:mt-5 md:gap-8">
        <h1 className="font-playfair text-4xl font-bold text-primary md:text-5xl">
          Verify Your Email
        </h1>
        <div className="w-[90%] space-y-4 rounded-lg border p-4 transition-colors duration-200 ease-in-out hover:bg-muted">
          <p className="text-center">
            Your account has been created. Please check your inbox to verify
            your email address.
          </p>
          <p className="text-center">
            If you don't see the email, please check your spam folder.
          </p>
        </div>
      </div>
    </main>
  );
}
