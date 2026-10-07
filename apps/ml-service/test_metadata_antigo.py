import joblib

metadata = joblib.load(
    "artifacts/metadata_modelo_causal_31.joblib"
)

print("=" * 80)
print("CHAVES DO METADATA ANTIGO")
print("=" * 80)

for chave in metadata:
    print("-", chave)

print("\n" + "=" * 80)
print("REFERENCIAS_NEUTRAS")
print("=" * 80)

print(metadata.get("referencias_neutras"))

print("\n" + "=" * 80)
print("SCORE_IFOREST")
print("=" * 80)

score_iforest = metadata.get("score_iforest")

if score_iforest:
    print("Chaves:", score_iforest.keys())
    print(
        "Quantidade de scores:",
        len(score_iforest.get("scores_historicos_ordenados", []))
    )