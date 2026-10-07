import joblib

metadata = joblib.load(
    "artifacts/metadata_modelo_investigacao_final.joblib"
)

print("=" * 80)
print("CHAVES DO METADATA FINAL")
print("=" * 80)

for chave in metadata:
    print("-", chave)

print("\n" + "=" * 80)
print("CONTEUDO")
print("=" * 80)

print(metadata)