import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend_project.settings')
django.setup()

from api.seed_data import run_seed
c, u = run_seed()
print(f"Seeded: {c} created, {u} updated successfully!")
