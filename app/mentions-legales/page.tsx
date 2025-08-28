export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <h1 className="font-playfair text-4xl font-light text-white mb-8">
            Mentions Légales
          </h1>
          
          <div className="prose prose-invert max-w-none text-white/80 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Informations légales</h2>
              <div className="space-y-2">
                <p><strong>Dénomination sociale :</strong> AS Prestige Care</p>
                <p><strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)</p>
                <p><strong>Capital social :</strong> 10 000 euros</p>
                <p><strong>SIRET :</strong> 123 456 789 00010</p>
                <p><strong>Code APE :</strong> 9609Z (Autres services personnels n.c.a.)</p>
                <p><strong>TVA Intracommunautaire :</strong> FR12345678900</p>
                <p><strong>Siège social :</strong> 123 Avenue de la République, 92100 Boulogne-Billancourt</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Direction de la publication</h2>
              <div className="space-y-2">
                <p><strong>Directeur de publication :</strong> [Nom du dirigeant]</p>
                <p><strong>Responsable éditorial :</strong> [Nom du responsable]</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
              <div className="space-y-2">
                <p><strong>Téléphone :</strong> 01 23 45 67 89</p>
                <p><strong>Email :</strong> contact@asprestigecare.fr</p>
                <p><strong>Adresse :</strong> 123 Avenue de la République, 92100 Boulogne-Billancourt</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Hébergement du site</h2>
              <div className="space-y-2">
                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
                <p><strong>Site web :</strong> <a href="https://vercel.com" className="text-[#D4AF37] hover:underline">vercel.com</a></p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Propriété intellectuelle</h2>
              <p>
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, etc.) est protégé par le droit de la propriété intellectuelle. 
                Toute reproduction, même partielle, est interdite sans autorisation préalable écrite d'AS Prestige Care.
              </p>
              <p>
                Les marques et logos mentionnés sur ce site sont déposés par AS Prestige Care ou par des tiers ayant autorisé leur utilisation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Données personnelles</h2>
              <p>
                AS Prestige Care s'engage à respecter la confidentialité des données personnelles collectées sur ce site, 
                conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD).
              </p>
              <p>
                Pour plus d'informations sur le traitement de vos données personnelles, 
                consultez notre <a href="/confidentialite" className="text-[#D4AF37] hover:underline">Politique de Confidentialité</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Cookies</h2>
              <p>
                Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. 
                En continuant à naviguer sur ce site, vous acceptez l'utilisation des cookies.
              </p>
              <p>
                Vous pouvez paramétrer votre navigateur pour refuser les cookies ou être averti de leur dépôt.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Responsabilité</h2>
              <p>
                AS Prestige Care met tout en œuvre pour fournir des informations exactes et à jour sur ce site. 
                Cependant, la société ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
              </p>
              <p>
                AS Prestige Care ne pourra être tenue responsable des dommages directs ou indirects résultant de l'utilisation de ce site 
                ou de l'impossibilité d'y accéder.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">Loi applicable</h2>
              <p>
                Les présentes mentions légales sont soumises au droit français. 
                En cas de litige, les tribunaux de Nanterre seront seuls compétents.
              </p>
            </section>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-white/60 text-sm">
                Mentions légales mises à jour le 15 novembre 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}