import time
import random

from this import s, d
from string import translate

from flask.ext.cache import Cache
from flask import Flask

app = Flask(__name__)
app.config['CACHE_TYPE'] = 'simple'
app.cache = Cache(app)


@app.cache.cached(timeout=10, key_prefix="current_time")
def get_current_time():
    return time.ctime()


def random_zen_quote():
    """Pega uma citação aleatória do Zen do Python"""
    transtable = str.maketrans("".join(d.keys()), "".join(d.values()))
    return random.choice(translate(s, transtable).split("\n")[2:])


@app.route("/")
def zen():
    return """
    <ul>
        <li><strong>Com cache:</strong> {cached}</li>
        <li><strong>Sem cache:</strong> {not_cached}</li>
    </ul>
    """.format(
        cached=get_current_time(),
        not_cached=random_zen_quote()
    )


if __name__ == "__main__":
    app.run(debug=True, port=5000, host='0.0.0.0')
