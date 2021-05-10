from flask import request
from google.auth.transport import requests
import google.oauth2.id_token

#administration muss importiert werden, ist aber noch nicht erstellt.


def secured(function):

    firebase_request_adapter = requests.Request()

    def wrapper(*args, **kwargs):
        # Verify Firebase auth.
        id_token = request.cookies.get("token")
        error_message = None
        claims = None
        objects = None

        if id_token:
            try:

                # http://flask.pocoo.org/docs/1.0/quickstart/#sessions).
                # Ist eine Anleitung wie man sessions erstellt und prüft, ob der user eingelogged ist.
                # Weiß noch nicht wie ich es implementiere
                claims = google.oauth2.id_token.verify_firebase_token(
                    id_token, firebase_request_adapter)

                if claims is not None:
                    #adm = ()  administrations Objekt benötigt

                    google_user_id = claims.get("user_id")
                    email = claims.get("email")
                    name = claims.get("name")

                    user = adm.get_user_by_google_user_id(google_user_id)
                    if user is not None:

                        user.set_name(name)
                        user.set_email(email)
                        adm.save_user(user)
                    else:

                        user = adm.create_user(name, email, google_user_id)

                    print(request.method, request.path, "angefragt durch:", name, email)

                    objects = function(*args, **kwargs)
                    return objects
                else:
                    return '', 401  # UNAUTHORIZED !!!
            except ValueError as exc:
                # This will be raised if the token is expired or any other
                # verification checks fail.
                error_message = str(exc)
                return exc, 401  # UNAUTHORIZED !!!

        return '', 401  # UNAUTHORIZED !!!

    return wrapper