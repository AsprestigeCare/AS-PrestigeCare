export default function CGVPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <h1 className="font-playfair text-4xl font-light text-white mb-8">
            Conditions Générales de Vente
          </h1>
          
          <div className="prose prose-invert max-w-none text-white/80 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Objet et champ d'application</h2>
              <p>
                Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre 
                AS Prestige Care, société spécialisée dans le nettoyage automobile premium à domicile, 
                et ses clients particuliers et professionnels.
              </p>
              <p>
                Toute commande de prestation implique l'acceptation pleine et entière des présentes CGV.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Prestations proposées</h2>
              <p>AS Prestige Care propose les services suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nettoyage intérieur premium (aspiration, nettoyage surfaces, traitement cuir/tissus)</li>
                <li>Nettoyage extérieur complet avec protection</li>
                <li>Services de rénovation (soft polish, sealant)</li>
                <li>Services express pour VTC (45 minutes)</li>
                <li>Abonnements mensuels avec tarifs préférentiels</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Zone d'intervention</h2>
              <p>
                AS Prestige Care intervient exclusivement en Île-de-France, répartie en 4 zones géographiques :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Zone 1 : Seine-Saint-Denis (93) - Interventions les lundis</li>
                <li>Zone 2 : Hauts-de-Seine (92) - Interventions les jeudis</li>
                <li>Zone 3 : Essonne (91) - Interventions les vendredis</li>
                <li>Zone 4 : Seine-et-Marne (77) - Interventions les mercredis</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Conditions d'intervention</h2>
              <h3 className="text-lg font-semibold text-white mb-2">4.1 Lieux d'intervention autorisés</h3>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li><strong>Emplacement privé autorisé :</strong> Allée, cour, box, parking d'entreprise - Tous services disponibles</li>
                <li><strong>Voie publique :</strong> Services intérieurs uniquement (réglementation municipale)</li>
                <li><strong>Micro-hub AS :</strong> Tous services disponibles dans nos locaux</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-white mb-2">4.2 Service de convoyage</h3>
              <p>
                Le service de convoyage est disponible uniquement pour les véhicules à boîte automatique (BVA) :
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>≤ 10 km : 29€</li>
                <li>11-20 km : 39€</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Tarifs et paiement</h2>
              <p>
                Les tarifs sont indiqués en euros TTC. Un dépôt de garantie de 20€ est exigé lors de la réservation, 
                le solde étant réglé sur place après intervention.
              </p>
              <p>
                Le paiement du dépôt s'effectue en ligne par carte bancaire via Stripe. 
                Le solde peut être réglé par carte bancaire, espèces ou virement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibent text-white mb-4">6. Annulation et report</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Annulation gratuite jusqu'à 24h avant l'intervention</li>
                <li>Annulation tardive : retenue de 50% du dépôt</li>
                <li>Report gratuit en cas de conditions météorologiques défavorables</li>
                <li>No-show client : forfait de déplacement de 30€</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Responsabilité et garanties</h2>
              <p>
                AS Prestige Care s'engage à fournir un service professionnel avec des produits de qualité. 
                La société est couverte par une assurance responsabilité civile professionnelle.
              </p>
              <p>
                Le client s'engage à signaler tout objet de valeur ou fragile présent dans le véhicule. 
                AS Prestige Care ne pourra être tenue responsable des dommages sur des objets non signalés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Données personnelles</h2>
              <p>
                Les informations collectées sont nécessaires à l'exécution des prestations et sont traitées 
                conformément au RGPD. Vous disposez d'un droit d'accès, de rectification et de suppression 
                de vos données personnelles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Litiges</h2>
              <p>
                En cas de litige, une solution amiable sera recherchée en priorité. 
                À défaut, les tribunaux de Nanterre seront seuls compétents.
              </p>
            </section>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-white/60 text-sm">
                CGV en vigueur au 15 novembre 2024 - AS Prestige Care - SIRET : 123 456 789 00010
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}