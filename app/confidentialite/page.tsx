export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-8">
          <h1 className="font-playfair text-4xl font-light text-white mb-8">
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-invert max-w-none text-white/80 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Collecte des données</h2>
              <p>
                AS Prestige Care collecte les données personnelles suivantes dans le cadre de ses activités :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Données d'identification :</strong> nom, prénom, email, téléphone</li>
                <li><strong>Données de localisation :</strong> adresse d'intervention, code postal</li>
                <li><strong>Données de prestation :</strong> type de véhicule, service demandé, notes particulières</li>
                <li><strong>Données de paiement :</strong> informations traitées par Stripe (aucune donnée bancaire stockée)</li>
                <li><strong>Données de navigation :</strong> adresse IP, cookies, données de trafic</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Finalités du traitement</h2>
              <p>Vos données personnelles sont collectées et traitées pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>L'exécution des prestations de nettoyage automobile</li>
                <li>La gestion des réservations et de la relation client</li>
                <li>Le traitement des paiements et la facturation</li>
                <li>L'amélioration de nos services et la communication marketing (avec votre consentement)</li>
                <li>Le respect de nos obligations légales et réglementaires</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. Base légale du traitement</h2>
              <p>Le traitement de vos données repose sur :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>L'exécution du contrat</strong> pour la fourniture des prestations</li>
                <li><strong>Votre consentement</strong> pour les communications marketing</li>
                <li><strong>L'intérêt légitime</strong> pour l'amélioration de nos services</li>
                <li><strong>Le respect d'obligations légales</strong> (facturation, comptabilité)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Destinataires des données</h2>
              <p>Vos données peuvent être transmises à :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personnel autorisé d'AS Prestige Care</strong> pour l'exécution des prestations</li>
                <li><strong>Prestataires techniques :</strong> Stripe (paiements), Vercel (hébergement)</li>
                <li><strong>Partenaires logistiques</strong> pour l'organisation des interventions</li>
                <li><strong>Autorités compétentes</strong> si requis par la loi</li>
              </ul>
              <p>
                Aucune donnée n'est vendue à des tiers à des fins commerciales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Durée de conservation</h2>
              <p>Vos données sont conservées pendant :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Données clients :</strong> 3 ans après la dernière prestation</li>
                <li><strong>Données de facturation :</strong> 10 ans (obligation légale)</li>
                <li><strong>Données de prospection :</strong> 3 ans après le dernier contact</li>
                <li><strong>Cookies :</strong> 13 mois maximum</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Sécurité des données</h2>
              <p>
                AS Prestige Care met en œuvre toutes les mesures techniques et organisationnelles appropriées 
                pour protéger vos données contre la perte, l'utilisation abusive ou l'accès non autorisé :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Chiffrement des données sensibles (HTTPS/TLS)</li>
                <li>Contrôle d'accès strict aux données</li>
                <li>Sauvegarde régulière et sécurisée</li>
                <li>Formation du personnel à la protection des données</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> corriger les données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format exploitable</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
                <li><strong>Droit de retrait du consentement</strong> à tout moment</li>
              </ul>
              
              <p className="mt-4">
                <strong>Pour exercer vos droits :</strong><br />
                Email : <a href="mailto:dpo@asprestigecare.fr" className="text-[#D4AF37] hover:underline">dpo@asprestigecare.fr</a><br />
                Courrier : AS Prestige Care - DPO, 123 Avenue de la République, 92100 Boulogne-Billancourt
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Cookies</h2>
              <p>Notre site utilise les cookies suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> pour mesurer l'audience (Google Analytics)</li>
                <li><strong>Cookies de préférence :</strong> pour mémoriser vos choix</li>
              </ul>
              <p>
                Vous pouvez gérer vos préférences de cookies via les paramètres de votre navigateur 
                ou notre outil de gestion des cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">9. Transferts internationaux</h2>
              <p>
                Certaines données peuvent être transférées vers des pays tiers (États-Unis) 
                dans le cadre de l'utilisation de services cloud (Vercel, Stripe).
              </p>
              <p>
                Ces transferts sont encadrés par des garanties appropriées (clauses contractuelles types, certifications).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">10. Réclamations</h2>
              <p>
                Si vous estimez que le traitement de vos données personnelles n'est pas conforme au RGPD, 
                vous pouvez introduire une réclamation auprès de la CNIL :
              </p>
              <p>
                <strong>CNIL</strong><br />
                3 Place de Fontenoy - TSA 80715<br />
                75334 PARIS CEDEX 07<br />
                Téléphone : 01 53 73 22 22<br />
                <a href="https://www.cnil.fr" className="text-[#D4AF37] hover:underline">www.cnil.fr</a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">11. Modifications</h2>
              <p>
                AS Prestige Care se réserve le droit de modifier cette politique de confidentialité à tout moment. 
                La version en vigueur est celle publiée sur le site web. 
                Nous vous informerons de toute modification substantielle par email ou notification sur le site.
              </p>
            </section>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-white/60 text-sm">
                Politique de confidentialité mise à jour le 15 novembre 2024<br />
                AS Prestige Care - DPO : dpo@asprestigecare.fr
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}