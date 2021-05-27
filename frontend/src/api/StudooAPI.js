import ChatTeilnahmeBO from "./ChatTeilnahmeBO";
import GruppenTeilnahmeBO from "./GruppenTeilnahmeBO";
import GruppenVorschlagBO from "./GruppenVorschlagBO";
import KonversationBO from "./KonversationBO";
import LerngruppeBO from "./LerngruppeBO";
import LernvorliebeBO from "./LernvorliebeBO";
import NachrichtBO from "./NachrichtBO";
import PartnerVorschlagBO from "./PartnerVorschlagBO";
import PersonBO from "./PersonBO";
import ProfilBO from "./ProfilBO";
//import {StudooAPI} from "./index";

/**
 * Diese Klasse abstrahiert das REST-Interface vom Python-Backend mit zugänglichen Methoden.
 * Diese Klasse wurde als Singleton implementiert, das bedeutet, dass genau ein Objekt dieser Klasse existiert.
 */
export default class StudooAPI {

    // Singleton-Instanz
    static #api = null;

    // Lokales Python-Backend
    #studooServerBaseURL = "/studoo";

    // Person-bezogen
    #getPersonenURL = () => `${this.#studooServerBaseURL}/personen`;
    #addPersonURL = () => `${this.#studooServerBaseURL}/personen`;
    #getPersonURL = (id) => `${this.#studooServerBaseURL}/person/${id}`;
    #updatePersonURL = (id) => `${this.#studooServerBaseURL}/person/${id}`;
    #deletePersonURL = (id) => `${this.#studooServerBaseURL}/person/${id}`;

    // Profil-bezogen
    #getProfileURL = () => `${this.#studooServerBaseURL}/profile`;
    #addProfilURL = () => `${this.#studooServerBaseURL}/profile`;
    #getProfilURL = (id) => `${this.#studooServerBaseURL}/profil/${id}`;
    #updateProfilURL = (id) => `${this.#studooServerBaseURL}/profil/${id}`;
    #deleteProfilURL = (id) => `${this.#studooServerBaseURL}/profil/${id}`;

    // Lernvorliebe-bezogen
    #getLernvorliebenURL = () => `${this.#studooServerBaseURL}/lernvorlieben`;
    #addLernvorliebeURL = () => `${this.#studooServerBaseURL}/lernvorlieben`;
    #getLernvorliebeURL = (id) => `${this.#studooServerBaseURL}/lernvorliebe/${id}`;
    #updateLernvorliebeURL = (id) => `${this.#studooServerBaseURL}/lernvorliebe/${id}`;
    #deleteLernvorliebeURL = (id) => `${this.#studooServerBaseURL}/lernvorliebe/${id}`;

    // Lerngruppe-bezogen

    // Konversation-bezogen

    #getKonversationenURL = () => `${this.#studooServerBaseURL}/konversationen`;
    #addKonversationURL = () => `${this.#studooServerBaseURL}/konversationen`;
    #getKonversationURL = (id) => `${this.#studooServerBaseURL}/konversation/${id}`;
    #updateKonversationURL = (id) => `${this.#studooServerBaseURL}/konversation/${id}`;
    #deleteKonversationURL = (id) => `${this.#studooServerBaseURL}/konversation/${id}`;

    // Nachricht-bezogen

    #getNachrichtenURL = () => `${this.#studooServerBaseURL}/nachrichten`;
    #addNachrichtenURL = () => `${this.#studooServerBaseURL}/nachrichten`;
    #getNachrichtURL = (id) => `${this.#studooServerBaseURL}/nachricht/${id}`;
    #updateNachrichtURL = (id) => `${this.#studooServerBaseURL}/nachricht/${id}`;
    #deleteNachrichtURL = (id) => `${this.#studooServerBaseURL}/nachricht/${id}`;

    // ChatTeilnahme-bezogen
    #getChatTeilnahmenURL = () => `${this.#studooServerBaseURL}/chatteilnahmen`;
    #addChatTeilnahmeURL = () => `${this.#studooServerBaseURL}/chatteilnahmen`;
    #getChatTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/chatteilnahme/${id}`;
    #updateChatTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/chatteilnahme/${id}`;
    #deleteChatTeilnahmeURL = (id) => `${this.#studooServerBaseURL}/chatteilnahme/${id}`;
    // GruppenTeilnahme-bezogen

    // GruppenVorschlag-bezogen

    // PartnerVorschlag-bezogen
    #getPartnerVorschlaegeURL = () => `${this.#studooServerBaseURL}/partnervorschlaege`;
    #addPartnerVorschlagURL = () => `${this.#studooServerBaseURL}/partnervorschlaege`;
    #getPartnerVorschlagURL = (id) => `${this.#studooServerBaseURL}/partnervorschlag/${id}`;
    #updatePartnerVorschlagURL = (id) => `${this.#studooServerBaseURL}/partnervorschlag/${id}`;
    #deletePartnerVorschlagURL = (id) => `${this.#studooServerBaseURL}/partnervorschlag/${id}`;
    /**
     * Getter für die Instanz dieser Klasse (Singleton)
     *
     * @public
     */
    static getAPI() {
        if (this.#api == null) {
            this.#api = new StudooAPI();
        }
        return this.#api
    }

    /**
     *  Returns a Promise which resolves to a json object.
     *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
     *  fetchAdvanced throws an Error also an server status errors
     */
    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {
            if (!res.ok) {
                throw Error(`${res.status} ${res.statusText}`);
            }
            return res.json();
        })
    // Person-bezogene Methoden

    /**
     * @public
     */
    getPersonen(){
        return this.#fetchAdvanced(this.#getPersonenURL()).then((responseJSON) => {
          let personBOs = PersonBO.fromJSON(responseJSON);

          return new Promise(function (resolve) {
            resolve(personBOs);
          })
        })

    }
    /**
    *   @param {PersonBO} personBO - Object von PersonBO
    */
    addPerson(personBO) {
        return this.#fetchAdvanced(this.#addPersonURL(), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(personBO)
        }).then((responseJSON) => {
          // We always get an array of CustomerBOs.fromJSON, but only need one object
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // console.info(accountBOs);
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
      }
    /**
    *   @param {*} personenID - ID von PersonBO
    */
    getPerson(personenID) {
    return this.#fetchAdvanced(this.#getPersonURL(personenID)).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON, but only need one object
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(responseCustomerBO);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

    /**
    *   @param {PersonBO} personBO - Object von PersonBO
    */
    updatePerson(personBO) {
    return this.#fetchAdvanced(this.#updatePersonURL(personBO.getID()), {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

    /**
    *   @param {*} personID -
    */
    deletePersonURL(personID) {
    return this.#fetchAdvanced(this.#deletePersonURL(personID), {
      method: 'DELETE'
    }).then((responseJSON) => {
      // We always get an array of CustomerBOs.fromJSON
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
      return new Promise(function (resolve) {
        resolve(responsePersonBO);
      })
    })
  }

    // Profil-bezogene Methoden
    /**
     * Returns a Promise, which resolves to an Array of ProfilBOs
     *
     * @public
     */
    getProfile() {
        return this.#fetchAdvanced(this.#getProfileURL()).then((responseJSON) => {
            let profilBOs = ProfilBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(profilBOs);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to a ProfilBO
     *
     * @public
     * @param {Number} profilID to be retrieved
     */
    getProfil(profilID) {
        return this.#fetchAdvanced(this.#getProfilURL(profilID)).then((responseJSON) => {
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfilBO);
            })
        })
    }

    /**
     * Adds a profile and returns a Promise, which resolves to a new ProfilBO object with the
     * lernvorliebenID of the parameter profilBO object.
     *
     * @param {ProfilBO} profilBO to be added. The ID of the new profile is set by the backend
     * @public
     */
    addProfil(profilBO) {
        return this.#fetchAdvanced(this.#addProfilURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(profilBO)
        }).then((responseJSON) => {
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfilBO);
            })
        })
    }

    /**
     * Updates a profile and returns a Promise, which resolves to a ProfilBO.
     *
     * @param {ProfilBO} profilBO to be updated.
     * @public
     */
    updateProfil(profilBO) {
        return this.#fetchAdvanced(this.#updateProfilURL(profilBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(profilBO)
        }).then((responseJSON) => {
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfilBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of ProfilBOs
     *
     * @param {Number} profilID to be deleted.
     * @public
     */
    deleteProfil(profilID) {
        return this.#fetchAdvanced(this.#deleteProfilURL(profilID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseProfilBO = ProfilBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseProfilBO);
            })
        })
    }

    // Lernvorliebe-bezogene Methoden
    /**
     * Returns a Promise, which resolves to an Array of LernvorliebeBOs
     *
     * @public
     */
    getLernvorlieben() {
        return this.#fetchAdvanced(this.#getLernvorliebenURL()).then((responseJSON) => {
            let lernvorliebeBOs = LernvorliebeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(lernvorliebeBOs);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to a LernvorliebeBO
     *
     * @public
     * @param {Number} lernvorliebeID to be retrieved
     */
    getLernvorliebe(lernvorliebeID) {
        return this.#fetchAdvanced(this.#getLernvorliebeURL(lernvorliebeID)).then((responseJSON) => {
            let responseLernvorliebeBO = LernvorliebeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLernvorliebeBO);
            })
        })
    }

    /**
     * Adds a lernvorliebe and returns a Promise, which resolves to a new LernvorliebeBO object with the
     * lerntyp, frequenz, extrovertiertheit, remote_praesenz, vorkenntnisse and lerninteressen
     * of the parameter profilBO object.
     *
     * @param {LernvorliebeBO} lernvorliebeBO to be added. The ID of the new lernvorliebe is set by the backend
     * @public
     */
    addLernvorliebe(lernvorliebeBO) {
        return this.#fetchAdvanced(this.#addLernvorliebeURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(lernvorliebeBO)
        }).then((responseJSON) => {
            let responseLernvorliebeBO = LernvorliebeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLernvorliebeBO);
            })
        })
    }

    /**
     * Updates a lernvorliebe and returns a Promise, which resolves to a LernvorliebeBO.
     *
     * @param {LernvorliebeBO} lernvorliebeBO to be updated.
     * @public
     */
    updateLernvorliebe(lernvorliebeBO) {
        return this.#fetchAdvanced(this.#updateLernvorliebeURL(lernvorliebeBO.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(lernvorliebeBO)
        }).then((responseJSON) => {
            let responseLernvorliebeBO = LernvorliebeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLernvorliebeBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of LernvorliebeBOs
     *
     * @param {Number} lernvorliebeID to be deleted.
     * @public
     */
    deleteLernvorliebe(lernvorliebeID) {
        return this.#fetchAdvanced(this.#deleteLernvorliebeURL(lernvorliebeID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseLernvorliebeBO = LernvorliebeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseLernvorliebeBO);
            })
        })
    }

    // Lerngruppe-bezogene Methoden

    // Konversation-bezogene Methoden

    /**
     * Returns a Promise, which resolves to an Array of KonversationBO
     *
     * @public
     */
    getKonversationen() {
        return this.#fetchAdvanced(this.#getKonversationenURL()).then((responseJSON) => {
            let konversationenBOs = KonversationBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(konversationenBOs);
            })
        })
    }

    /**
     * Adds a conversation and returns a Promise, which resolves to a new KonversationBO object.
     *
     * @param {KonversationBO} konversationBO to be added. The ID of the new conversation is set by the backend
     * @public
     */
    addKonversation(konversationBO) {
    return this.#fetchAdvanced(this.#addKonversationURL(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(konversationBO)
    }).then((responseJSON) => {
        let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseKonversationBO);
    })
    })
    }

    /**
   * Returns a Promise, which resolves to a KonversationBO
   *
   * @param {Number} konversationID to be retrieved
   * @public
   */
    getKonversation(konversationID) {
        return this.#fetchAdvanced(this.#getKonversationURL(konversationID)).then((responseJSON) => {
            let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseKonversationBO);
          })
        })
      }

    /**
     * Updates a conversation and returns a Promise, which resolves to a new KonversationBO object.
     *
     * @param {KonversationBO} konversationBO to be added. The ID of the new conversation is set by the backend
     * @public
     */
    updateKonversation(konversationBO) {
    return this.#fetchAdvanced(this.#updateKonversationURL(), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(konversationBO)
    }).then((responseJSON) => {
        let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseKonversationBO);
    })
    })
    }

    /**
     * Returns a Promise, which resolves to an Array of KonversationBO
     *
     * @param {Number} konversationID to be deleted
     * @public
     */
    deleteKonversation(konversationID) {
        return this.#fetchAdvanced(this.#deleteKonversationURL(konversationID), {
            method: 'DELETE'
    }).then((responseJSON) => {
        let responseKonversationBO = KonversationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseKonversationBO);
        })
    })
}

    // Nachricht-bezogene Methoden

    /**
     * Returns a Promise, which resolves to an Array of NachrichtBO
     *
     * @public
     */
    getNachrichten() {
        return this.#fetchAdvanced(this.#getNachrichtenURL()).then((responseJSON) => {
            let nachrichtenBOs = NachrichtBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(nachrichtenBOs);
            })
        })
    }

    /**
     * Adds a message and returns a Promise, which resolves to a new NachrichtBO object.
     *
     * @param {NachrichtBO} nachrichtBO to be added. The ID of the new message is set by the backend
     * @public
     */
    addNachricht(nachrichtBO) {
    return this.#fetchAdvanced(this.#addNachrichtenURL(), {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(nachrichtBO)
    }).then((responseJSON) => {
        let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseNachrichtBO);
    })
    })
    }

    /**
   * Returns a Promise, which resolves to a NachrichtBO
   *
   * @param {Number} nachrichtID to be retrieved
   * @public
   */
    getNachricht(nachrichtID) {
        return this.#fetchAdvanced(this.#getNachrichtURL(nachrichtID)).then((responseJSON) => {
            let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseNachrichtBO);
          })
        })
      }

    /**
     * Updates a message and returns a Promise, which resolves to a new NachrichtBO object.
     *
     * @param {NachrichtBO} nachrichtBO to be added. The ID of the new message is set by the backend
     * @public
     */
    updateNachricht(nachrichtBO) {
    return this.#fetchAdvanced(this.#updateNachrichtURL(), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
        },
        body: JSON.stringify(nachrichtBO)
    }).then((responseJSON) => {
        let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
            resolve(responseNachrichtBO);
    })
    })
    }

    /**
     * Returns a Promise, which resolves to an Array of NachrichtBO
     *
     * @param {Number} nachrichtID to be deleted
     * @public
     */
    deleteNachricht(nachrichtID) {
        return this.#fetchAdvanced(this.#deleteNachrichtURL(nachrichtID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseNachrichtBO = NachrichtBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseNachrichtBO);
            })
        })
    }
    // ChatTeilnahme-bezogene Methoden
    /**
     * Returns a Promise, which resolves to an Array of ChatteilnahmeBO
     *
     * @public
     */
    getChatTeilnahmen() {
        return this.#fetchAdvanced(this.#getChatTeilnahmenURL()).then((responseJSON) => {
            let chatteilnahmeBOs = ChatTeilnahmeBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(chatteilnahmeBOs);
            })
        })
    }

    /**
     * Adds a Chatteilnahme and returns a Promise, which resolves to a new ChatteilnahmeBO object.
     *
     * @param {ChatTeilnahmeBO} chatteilnahmeBO to be added. The ID of the new Chatteilnahme is set by the backend
     * @public
     */
    addChatTeilnahmen(chatteilnahmeBO) {
        return this.#fetchAdvanced(this.#addChatTeilnahmeURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chatteilnahmeBO)
        }).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to a ChatteilnahmeBO
     *
     * @param {Number} chatteilnahmeID to be retrieved
     * @public
     */
    getChatTeilnahme(chatteilnahmeID) {
        return this.#fetchAdvanced(this.#getChatTeilnahmeURL(chatteilnahmeID)).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    /**
     * Updates a Chatteilnahme and returns a Promise, which resolves to a new ChatteilnahmeBO object.
     *
     * @param {ChatTeilnahmeBO} chatteilnahmeBO to be added. The ID of the new conversation is set by the backend
     * @public
     */
    updateChatTeilnahme(chatteilnahmeBO) {
        return this.#fetchAdvanced(this.#updateChatTeilnahmeURL(), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(chatteilnahmeBO)
        }).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of ChatteilnahmeBO
     *
     * @param {Number} chatteilnahmeID to be deleted
     * @public
     */
    deleteChatTeilnahme(chatteilnahmeID) {
        return this.#fetchAdvanced(this.#deleteChatTeilnahmeURL(chatteilnahmeID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responseChatteilnahmeBO = ChatTeilnahmeBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseChatteilnahmeBO);
            })
        })
    }

    // GruppenTeilnahme-bezogene Methoden

    // GruppenVorschlag-bezogene Methoden

    // PartnerVorschlag-bezogene Methoden
    /**
     * Returns a Promise, which resolves to an Array of PartnervorschlagBO
     *
     * @public
     */
    getPartnerVorschlaege() {
        return this.#fetchAdvanced(this.#getPartnerVorschlaegeURL()).then((responseJSON) => {
            let partnervorschlagBOs = PartnerVorschlagBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(partnervorschlagBOs);
            })
        })
    }

    /**
     * Adds a Partnervorschlag and returns a Promise, which resolves to a new PartnervorschlagBO object.
     *
     * @param {PartnerVorschlagBO} partnervorschlagBO to be added. The ID of the new Partnervorschlag is set by the backend
     * @public
     */
    addPartnerVorschlaege(partnervorschlagBO) {
        return this.#fetchAdvanced(this.#addPartnerVorschlagURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(partnervorschlagBO)
        }).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnerVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to a PartnervorschlagBO
     *
     * @param {Number} partnervorschlagID to be retrieved
     * @public
     */
    getPartnerVorschlag(partnervorschlagID) {
        return this.#fetchAdvanced(this.#getPartnerVorschlagURL(partnervorschlagID)).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnerVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

    /**
     * Updates a Partnervorschlag and returns a Promise, which resolves to a new PartnervorschlagBO object.
     *
     * @param {PartnerVorschlagBO} partnervorschlagBO to be added. The ID of the new Partnervorschlag is set by the backend
     * @public
     */
    updatePartnerVorschlag(partnervorschlagBO) {
        return this.#fetchAdvanced(this.#updatePartnerVorschlagURL(), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(partnervorschlagBO)
        }).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnerVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

    /**
     * Returns a Promise, which resolves to an Array of PartnervorschlagBO
     *
     * @param {Number} partnervorschlagID to be deleted
     * @public
     */
    deletePartnerVorschlag(partnervorschlagID) {
        return this.#fetchAdvanced(this.#deletePartnerVorschlagURL(partnervorschlagID), {
            method: 'DELETE'
        }).then((responseJSON) => {
            let responsePartnervorschlagBO = PartnerVorschlagBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responsePartnervorschlagBO);
            })
        })
    }

}




