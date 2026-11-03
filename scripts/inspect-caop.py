
from pathlib import Path
import sqlite3

# Localização da pasta dos dados
PROJECT_ROOT = Path(__file__).resolve().parent.parent
CAOP_FOLDER = PROJECT_ROOT / "data" / "caop"

files = sorted(CAOP_FOLDER.rglob("*.gpkg"))

if not files:
    print("Não foram encontrados ficheiros .gpkg.")
    raise SystemExit(1)

for file in files:
    print("\n" + "=" * 65)
    print(f"FICHEIRO: {file.name}")
    print("=" * 65)

    try:
        connection = sqlite3.connect(
            f"file:{file.resolve().as_posix()}?mode=ro",
            uri=True
        )

        cursor = connection.cursor()

        cursor.execute("""
            SELECT table_name, data_type, identifier, srs_id
            FROM gpkg_contents
        """)

        layers = cursor.fetchall()

        for table, data_type, identifier, srs_id in layers:
            print(f"\nCamada: {table}")
            print(f"Tipo: {data_type}")
            print(f"Identificador: {identifier}")
            print(f"SRS ID: {srs_id}")

            if data_type == "features":
                cursor.execute(
                    f'PRAGMA table_info("{table}")'
                )

                columns = [row[1] for row in cursor.fetchall()]
                print(f"Campos: {', '.join(columns)}")

                cursor.execute(
                    f'SELECT COUNT(*) FROM "{table}"'
                )

                print(f"Registos: {cursor.fetchone()[0]}")

        connection.close()

    except Exception as error:
        print(f"ERRO: {error}")

print("\nInspeção concluída.")
