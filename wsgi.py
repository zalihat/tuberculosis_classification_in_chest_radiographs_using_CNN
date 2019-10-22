from app.server import app

if __name__ == '__main__':
    if 'serve' in sys.argv:
        app.run()