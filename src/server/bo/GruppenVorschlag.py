from server.bo import Vorschlag as vo


class GruppenVorschlag(vo.Vorschlag):
    """Realisierung der Klasse GruppenVorschlag, welche von der abstrakten Klasse Vorschlag seine Grundstruktur erbt.
    Zusätzliche Attribute sind auf die vorgeschlagene Lerngruppe bezogen
    """
    def __init__(self):
        super().__init__()
        self.gruppenvorschlag_id = 0        # Fremdschlüsselbeziehung zur vorgeschlagenen Gruppe
        self.entscheidung_gruppe = None

    def get_gruppenvorschlag_id(self):
        return self.gruppenvorschlag_id

    def set_gruppenvorschlag_id(self, gruppen_id: int):
        self.gruppenvorschlag_id = gruppen_id

    def get_entscheidung_gruppe(self):
        return self.entscheidung_gruppe

    def set_entscheidung_gruppe(self, wert: float):
        self.entscheidung_gruppe = wert

    def __str__(self):
        """Dunder-Method für GruppenVorschlag
        :return: String, der die Klasse beschreibt.
        """
        return "Nr.{}: Person {} und Gruppe {} mit Ähnl. {}: {} & {}".format(
            self.get_id(),self.get_person_id(),self.get_gruppenvorschlag_id(),self.get_aehnlichkeit(),
            self.get_entscheidung_person(),self.get_entscheidung_gruppe()
        )

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = GruppenVorschlag()
        obj.set_id(dictionary["id"])
        obj.set_erstellungszeitpunkt(dictionary["erstellungszeitpunkt"])
        obj.set_gruppenvorschlag_id(dictionary["gruppenvorschlag_id"])
        obj.set_entscheidung_gruppe(dictionary["entscheidung_gruppe"])
        return obj