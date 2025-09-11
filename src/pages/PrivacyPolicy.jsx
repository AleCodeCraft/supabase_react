import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-surface-primary rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-text-primary mb-8 text-center">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-text-secondary">
            <p className="text-sm text-text-tertiary mb-8">
              Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                1. Informazioni Generali
              </h2>
              <p>
                Arena StileNuovo ("noi", "nostro" o "sito") rispetta la tua privacy e si impegna a proteggere 
                le tue informazioni personali. Questa Privacy Policy spiega come raccogliamo, utilizziamo e 
                proteggiamo le tue informazioni quando visiti il nostro sito web.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                2. Dati che Raccogliamo
              </h2>
              <h3 className="text-xl font-medium text-text-primary mb-3">
                2.1 Dati forniti direttamente
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Nome e cognome</li>
                <li>Indirizzo email</li>
                <li>Informazioni di contatto</li>
                <li>Messaggi e comunicazioni</li>
              </ul>
              
              <h3 className="text-xl font-medium text-text-primary mb-3">
                2.2 Dati raccolti automaticamente
              </h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Indirizzo IP</li>
                <li>Tipo di browser e dispositivo</li>
                <li>Pagine visitate e tempo di permanenza</li>
                <li>Data e ora delle visite</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                3. Come Utilizziamo i Tuoi Dati
              </h2>
              <p>Utilizziamo le tue informazioni per:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Fornire e migliorare i nostri servizi</li>
                <li>Rispondere alle tue richieste e comunicazioni</li>
                <li>Inviare aggiornamenti e newsletter (con il tuo consenso)</li>
                <li>Analizzare l'utilizzo del sito per miglioramenti</li>
                <li>Rispettare obblighi legali</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                4. Condivisione dei Dati
              </h2>
              <p>
                Non vendiamo, affittiamo o condividiamo le tue informazioni personali con terze parti, 
                eccetto nei seguenti casi:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Con il tuo consenso esplicito</li>
                <li>Per rispettare obblighi legali</li>
                <li>Con fornitori di servizi che ci aiutano a gestire il sito (sotto accordi di riservatezza)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                5. I Tuoi Diritti (GDPR)
              </h2>
              <p>Hai il diritto di:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Accedere ai tuoi dati personali</li>
                <li>Correggere dati inesatti o incompleti</li>
                <li>Richiedere la cancellazione dei tuoi dati</li>
                <li>Limitare il trattamento dei tuoi dati</li>
                <li>Portabilità dei dati</li>
                <li>Opporti al trattamento</li>
                <li>Ritirare il consenso in qualsiasi momento</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                6. Sicurezza
              </h2>
              <p>
                Implementiamo misure di sicurezza appropriate per proteggere le tue informazioni personali 
                contro accessi non autorizzati, alterazioni, divulgazioni o distruzioni.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                7. Cookie
              </h2>
              <p>
                Il nostro sito utilizza cookie per migliorare la tua esperienza di navigazione. 
                Puoi gestire le preferenze dei cookie attraverso le impostazioni del tuo browser.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-text-primary mb-4">
                8. Contatti
              </h2>
              <p>
                Per domande su questa Privacy Policy o per esercitare i tuoi diritti, 
                contattaci all'indirizzo:
              </p>
              <div className="bg-surface-secondary p-4 rounded-lg mt-4">
                <p className="font-medium text-text-primary">Arena StileNuovo</p>
                <p>Email: <a href="mailto:alex.studiolab@gmail.com" className="text-gold-600 hover:text-gold-500">alex.studiolab@gmail.com</a></p>
              </div>
            </section>

            <div className="border-t border-gold-600/20 pt-6 mt-8">
              <p className="text-sm text-text-tertiary text-center">
                Questa Privacy Policy può essere aggiornata periodicamente. 
                Ti consigliamo di consultarla regolarmente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
