class Page404 {
    #application;
    constructor(application) {
        this.#application = application;
        this.render();
    }

    render() {
        this.#application.conteneurHTML.innerHTML = `
            <section class="p-5 container mx-auto bg-slate-100 min-h-screen flex justify-center items-center flex-col gap-8">
              <h1 class="text-5xl text-orange-800 font-bold"><i class="fa-solid fa-person-digging mr-4"></i>Page non trouvée</h1>
              <a href="/" class="text-lg text-orange-600 underline hover:text-orange-400">Retour à la page d'accueil</a>
            </section>
        `;
    }
}
export default Page404;
