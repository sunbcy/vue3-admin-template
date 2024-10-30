import warnings

from app import create_app

# 设置警告过滤器，忽略所有警告
warnings.simplefilter("ignore")
app = create_app()


@app.route("/")
def index():
    return app.send_static_file('index.html')
