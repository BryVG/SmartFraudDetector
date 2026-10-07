import json
import joblib
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
ARTIFACTS_DIR = BASE_DIR / "artifacts"


MODEL_PATH = ARTIFACTS_DIR / "isolation_forest_causal_final.joblib"
FEATURES_PATH = ARTIFACTS_DIR / "features_iforest_causal_final.joblib"
CONFIG_PATH = ARTIFACTS_DIR / "config_score_investigacao_final.json"
METADATA_PATH = ARTIFACTS_DIR / "metadata_modelo_investigacao_final.joblib"


modelo = joblib.load(MODEL_PATH)
features = joblib.load(FEATURES_PATH)

with open(CONFIG_PATH, "r", encoding="utf-8") as arquivo:
    config = json.load(arquivo)

metadata = joblib.load(METADATA_PATH)


print("Modelo carregado:", type(modelo).__name__)
print("Quantidade de features:", len(features))
print("Features:")
for feature in features:
    print(" -", feature)

print("\nConfiguração:")
print(json.dumps(config, indent=2, ensure_ascii=False))

print("\nMetadata carregada.")
print("Registros de treinamento:", metadata["dataset"]["registros_treinamento"])