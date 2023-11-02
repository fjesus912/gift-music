const PublicLayout = ({children}) => {
  return (
    <section className="bg-dark text-white font-urbanist h-screen grid bg-[url(/images/auth-bg-mobile.png)] bg-no-repeat bg-right-bottom md:bg-[url(/images/auth-bg-desktop.png)] transition-all grid-rows-[auto,_1fr]">

    <header className="bg-primary-dark flex justify-center p-4 px-4 uppercase items-center">
      <h1 className="font-semibold text-lg">Gift Music</h1>
    </header>
    <section className="py-14 px-4 overflow-y-auto">
      <main className="w-[min(520px,_100%)] bg-primary-dark py-8 px-6 sm:px-14 mx-auto rounded-3xl">
        {children}
      </main>
    </section>
  </section>
  )
}
export default PublicLayout