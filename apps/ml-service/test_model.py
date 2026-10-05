import joblib


MODEL_PATH = "artifacts/isolation_forest_final.joblib"
FEATURES_PATH = "artifacts/features_iforest_final.joblib"
METADATA_PATH = "artifacts/metadata_modelo.joblib"


print("Carregando modelo...")
model = joblib.load(MODEL_PATH)

print("Carregando features...")
features = joblib.load(FEATURES_PATH)

print("Carregando metadata...")
metadata = joblib.load(METADATA_PATH)


print("\n===== MODELO =====")
print(f"Tipo: {type(model).__name__}")
print(f"Estimators: {model.n_estimators}")
print(f"Contamination: {model.contamination}")


print("\n===== FEATURES =====")
print(f"Quantidade: {len(features)}")

for i, feature in enumerate(features, start=1):
    print(f"{i:02d}. {feature}")


print("\n===== METADATA =====")
print(f"Versão: {metadata['versao']}")
print(f"Modelo: {metadata['modelo']}")
print(f"Random state: {metadata['random_state']}")


print("\n===== SCORE ISOLATION FOREST =====")

score_iforest = metadata["score_iforest"]

print(f"Transformação: {score_iforest['transformacao']}")
print(f"P75: {score_iforest['p75']}")
print(f"P90: {score_iforest['p90']}")
print(f"P95: {score_iforest['p95']}")


scores_historicos = score_iforest["scores_historicos_ordenados"]

print(f"Scores históricos: {len(scores_historicos)}")


print("\n===== REFERÊNCIAS NEUTRAS =====")

for nome, valor in metadata["referencias_neutras"].items():
    print(f"{nome}: {valor}")


print("\n===== PESOS DE INVESTIGAÇÃO =====")

for nome, peso in metadata["pesos_investigacao"].items():
    print(f"{nome}: {peso}")


print("\nModelo carregado e metadata validado com sucesso!")