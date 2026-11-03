
from pathlib import Path
import pyogrio
import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parent.parent
CAOP_FOLDER = PROJECT_ROOT / "data" / "caop"
OUTPUT_FOLDER = PROJECT_ROOT / "public" / "data"

OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

FILES = [
    ("Continente_CAOP2025.gpkg", "cont_municipios"),
    ("ArqAcores_GCentral_GOriental_CAOP2025.gpkg",
     "raa_cen_ori_municipios"),
    ("ArqAcores_GOcidental_CAOP2025.gpkg",
     "raa_oci_municipios"),
    ("ArqMadeira_CAOP2025.gpkg", "ram_municipios"),
]

frames = []

for filename, layer in FILES:
    filepath = next(CAOP_FOLDER.rglob(filename), None)

    if filepath is None:
        raise FileNotFoundError(f"Não encontrei: {filename}")

    print(f"A ler {filename}...")

    gdf = pyogrio.read_dataframe(
        filepath,
        layer=layer,
    )

    # Converter cada região para WGS84 antes de juntar.
    gdf = gdf.to_crs("EPSG:4326")

    frames.append(gdf)

print("A juntar os municípios...")

municipios = pd.concat(frames, ignore_index=True)

municipios = municipios[
    [
        "dtmn",
        "municipio",
        "distrito_ilha",
        "nuts3",
        "area_ha",
        "geometry",
    ]
].copy()

municipios = municipios.rename(columns={
    "dtmn": "codigo",
    "municipio": "nome",
})

output_file = OUTPUT_FOLDER / "municipios.geojson"

pyogrio.write_dataframe(
    municipios,
    output_file,
    driver="GeoJSON",
)

print("\nConversão concluída!")
print(f"Total de municípios: {len(municipios)}")
print(f"Ficheiro criado: {output_file}")
