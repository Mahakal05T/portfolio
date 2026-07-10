import os
import sys

# Add the backend directory to Python path so Vercel can find our modules
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app

app = create_app()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
