import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    en: {
        translation: {
            "login": "Login",
            "logout": "Log Out",
            "postCode": "Post Code",
            "postCodeDesc": "Please enter the postcode (or your country's equivalent) you registered with:",
            "votingCode": "Voting Code",
            "votingCodeDesc": "Please enter your unique voting code you received in the mail:",
            "registerBtn": "Or Register To Vote",
            "register": "Register",
            "regToVote": "Register To Vote",
            "firstName": "First Name",
            "lastName": "Last Name",
            "country": "Country",
            "countryDesc": "Please Choose a Country",
            "nationality": "Nationality",
            "nationalityDesc": "Please Choose a Nationality",
            "dob": "Date of Birth",
            "fullAddress": "Full Address",
            "accessibilityMode": "Accessibility Mode",
            "electionHeader": "Please choose the election you wish to vote in",
            "noElections": "No elections available!",
            "fptpDescLine1":"Please click on the candidate you wish to vote for",
            "fptpDescLine2":"You will only be able to choose one candidate",
            "stvPvDescLine1":"",
            "stvPvDescLine2":"",
            "stvPvDescLine3":"",
            "stvPvDescLine4":"",
            "submitVote":"Submit Vote",
            "spoilBallot":"Spoil Ballot",
            "selectCandidate":" Please Select a Candidate!",
            "confirmVote": "Confirm Vote",
            "voteSelect": "You have selected to vote for:",
            "voteFinalise": "Is this your choice?"
        }
    },
    fr: {
        translation: {
            "login": "S'identifier",
            "logout": "Connectez - Out",
            "postCode": "Code Postal",
            "postCodeDesc": "Veuillez entrer le code postal (ou l’équivalent de votre pays) avec lequel vous vous êtes inscrit:",
            "votingCode": "Code de vote",
            "votingCodeDesc": "Veuillez entrer votre code de vote unique que vous avez reçu par la poste:",
            "registerBtn": "Ou s'inscrire pour voter",
            "register": "Registre",
            "regToVote": "Inscrivez-vous pour voter",
            "firstName": "Prénom",
            "lastName": "Nom de famille",
            "country": "Pays",
            "countryDesc": "S'il vous plaît choisir un pays",
            "nationality": "Nationalité",
            "nationalityDesc": "Veuillez choisir une nationalité",
            "dob": "Date de naissance",
            "fullAddress": "Adresse complète",
            "accessibilityMode": "Mode d'accessibilité",
            "electionHeader": "Veuillez choisir l'élection pour laquelle vous souhaitez voter",
            "noElections": "Aucune élection disponible!",
            "fptpDescLine1":"Veuillez cliquer sur le candidat pour lequel vous souhaitez voter",
            "fptpDescLine2":"Vous ne pourrez choisir qu'un seul candidat",
            "stvPvDescLine1":"",
            "stvPvDescLine2":"",
            "stvPvDescLine3":"",
            "stvPvDescLine4":"",
            "submitVote":"Soumettre un vote",
            "spoilBallot":"Débloquer le bulletin de vote",
            "selectCandidate":"S'il vous plaît sélectionner un candidat!",
            "confirmVote": "Confirmer le vote",
            "voteSelect": "Vous avez choisi de voter pour:",
            "voteFinalise": "¿Es esta tu elección?"
        }
    },
    es: {
        translation: {
            "login": "Iniciar sesión",
            "logout": "Cerrar sesión",
            "postCode": "código postal",
            "postCodeDesc": "Introduzca el código postal (o el equivalente de su país) con el que se registró:",
            "votingCode": "Código de votación",
            "votingCodeDesc": "Por favor ingrese su código de votación único que recibió en el correo:",
            "registerBtn": "O registrarse para votar",
            "register": "Registro",
            "regToVote": "Registrarse para votar",
            "firstName": "Nombre de pila",
            "lastName": "Apellido",
            "country": "País",
            "countryDesc": "Por favor elija un país",
            "nationality": "Nacionalidad",
            "nationalityDesc": "Por favor elige una nacionalidad",
            "dob": "Fecha de nacimiento",
            "fullAddress": "Dirección completa",
            "accessibilityMode": "Modo de accesibilidad",
            "electionHeader": "Por favor, elija la elección que desea votar en",
            "noElections": "No hay elecciones disponibles!",
            "fptpDescLine1":"Por favor, haga clic en el candidato por el que desea votar",
            "fptpDescLine2":"Solo podrá elegir un candidato",
            "stvPvDescLine1":"",
            "stvPvDescLine2":"",
            "stvPvDescLine3":"",
            "stvPvDescLine4":"",
            "submitVote":"Enviar voto",
            "spoilBallot":"Boleta de botín",
            "selectCandidate":" Por favor, seleccione un candidato!",
            "confirmVote": "Confirmar voto",
            "voteSelect": "Has seleccionado votar por:",
            "voteFinalise": "¿Es esta tu elección?"

        }

    },
    cy: {
        translation: {
            "login": "Mewngofnodi",
            "logout": "Allgofnodi",
            "postCode": "Cod Post",
            "postCodeDesc": "Rhowch y cod post (neu gyfatebol i'ch gwlad chi) yr ydych wedi cofrestru gyda nhw:",
            "votingCode": "Cod Pleidleisio",
            "votingCodeDesc": "Nodwch eich cod pleidleisio unigryw a gawsoch yn y post:",
            "registerBtn": "Neu Cofrestrwch i Bleidleisio",
            "register": "Cofrestrwch",
            "regToVote": "Cofrestru i Bleidleisio",
            "firstName": "Enw cyntaf",
            "lastName": "Enw Diwethaf",
            "country": "Gwlad",
            "countryDesc": "Dewiswch wlad os gwelwch yn dda",
            "nationality": "Cenedligrwydd",
            "nationalityDesc": "Dewiswch Genedligrwydd",
            "dob": "Dyddiad Geni",
            "fullAddress": "Cyfeiriad Llawn",
            "accessibilityMode": "Modd Hygyrchedd",
            "electionHeader": "Dewiswch yr etholiad yr hoffech bleidleisio ynddo",
            "noElections": "Dim etholiadau ar gael!",
            "fptpDescLine1":"Cliciwch ar yr ymgeisydd yr hoffech bleidleisio drosto", 
            "fptpDescLine2" : "Dim ond un ymgeisydd y gallwch ei ddewis",
            "stvPvDescLine1":"",
            "stvPvDescLine2":"",
            "stvPvDescLine3":"",
            "stvPvDescLine4":"",
            "submitVote":"Cyflwyno Pleidlais",
            "spoilBallot":"Pleidleisiwch",
            "selectCandidate":" Dewiswch Ymgeisydd os gwelwch yn dda!",
            "confirmVote": "Cadarnhewch Bleidlais",
            "voteSelect": "Rydych chi wedi dewis pleidleisio dros:",
            "voteFinalise": "Ai dyma'ch dewis chi?"


        }
    }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;