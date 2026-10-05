from services.feature_service import FeatureService


service = FeatureService()


print("\n===== VALIDAÇÃO =====")

print(f"Features: {len(service.features)}")
print(f"Histórico API: {service.historico_api.shape}")
print(f"Referências preço: {service.referencias_preco.shape}")
print(f"Referências quantidade: {service.referencias_quantidade.shape}")
print(f"Histórico fornecedor: {service.historico_fornecedor.shape}")
print(f"Histórico órgão: {service.historico_orgao.shape}")
print(f"Histórico concorrência: {service.historico_concorrencia.shape}")
print(f"Histórico temporal: {service.historico_temporal.shape}")
print(f"Histórico contratos: {service.historico_contratos.shape}")