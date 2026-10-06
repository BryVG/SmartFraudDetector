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


print("\n===== TESTE REFERÊNCIA DE QUANTIDADE =====")

resultado = service.buscar_referencia_quantidade(
    "CADEIRA SOBRE",
    None
)

print(resultado)



print("\n===== TESTE FEATURES PREÇO + QUANTIDADE =====")

features = service.calcular_features_preco_quantidade(
    descricao="CADEIRA SOBRE",
    unidade=None,
    preco=120.00,
    quantidade=50
)

print(features)

print("\n===== REGRAS ESTATÍSTICAS =====")

print(service.metadata["regras_estatisticas"])

print("\n===== TESTE CONSISTÊNCIA DO TOTAL =====")

preco = 120.00
quantidade = 50

total_calculado = preco * quantidade

print("Total calculado:", total_calculado)

valor_total_consistente = 6000.00
valor_total_inconsistente = 9000.00

diferenca_consistente = abs(
    total_calculado - valor_total_consistente
) / abs(valor_total_consistente)

diferenca_inconsistente = abs(
    total_calculado - valor_total_inconsistente
) / abs(valor_total_inconsistente)

print("Diferença relativa consistente:", diferenca_consistente)
print("Diferença relativa inconsistente:", diferenca_inconsistente)

print("\n===== TESTE FEATURES CONSISTÊNCIA =====")

consistente = service.calcular_features_consistencia(
    preco=120.00,
    quantidade=50,
    valor_total=6000.00
)

inconsistente = service.calcular_features_consistencia(
    preco=120.00,
    quantidade=50,
    valor_total=9000.00
)

sem_referencia = service.calcular_features_consistencia(
    preco=120.00,
    quantidade=50,
    valor_total=None
)

print("Consistente:", consistente)
print("Inconsistente:", inconsistente)
print("Sem referência:", sem_referencia)

print("\n===== TESTE SHARE FORNECEDOR =====")

share = service.calcular_feature_share_fornecedor(
    descricao="CADEIRA SOBRE",
    fornecedor="00000000000100",
    data_compra="2025-12-31"
)

print(share)


print("\n===== TESTE ESTRUTURA FORNECEDOR =====")

estrutura = service.calcular_features_estrutura_fornecedor(
    descricao="CADEIRA SOBRE",
    fornecedor="00000000000100",
    data_compra="2025-12-31"
)

print(estrutura)

print("\n===== TESTE ÓRGÃO + TEMPORAL =====")

orgao_temporal = service.calcular_features_orgao_temporal(
    descricao="CADEIRA SOBRE",
    orgao="00000000000100",
    quantidade=50,
    data_compra="2025-12-31 10:30:00"
)

print(orgao_temporal)

print("\n===== TESTE CONCORRÊNCIA + CONTRATO =====")

concorrencia_contrato = service.calcular_features_concorrencia_contrato(
    descricao="CADEIRA SOBRE",
    unidade=None,
    fornecedor="00000000000100",
    preco=120.00,
    orgao="00000000000100",
    data_compra="2025-12-31"
)

print(concorrencia_contrato)

print("\n===== TESTE 24 FEATURES =====")

features_completas = service.calcular_features_completas(
    descricao="CADEIRA SOBRE",
    unidade=None,
    preco=120.00,
    quantidade=50,
    valor_total=6000.00,
    fornecedor="00000000000100",
    orgao="00000000000100",
    data_compra="2025-12-31"
)

print("Quantidade de features:", len(features_completas))

print("\nOrdem das features:")

for i, feature in enumerate(features_completas, start=1):
    print(f"{i:02d}. {feature} = {features_completas[feature]}")

print("\nOrdem esperada pelo modelo:")

for i, feature in enumerate(service.features, start=1):
    print(f"{i:02d}. {feature}")

print(
    "\nOrdem correta:",
    list(features_completas.keys()) == service.features
)

print("\n===== TESTE ISOLATION FOREST =====")

from services.scoring_service import ScoringService

scoring_service = ScoringService(service)

resultado_score = scoring_service.calcular_score(
    features_completas
)

print("Score:", resultado_score["score_iforest"])
print("Percentil:", resultado_score["percentil_iforest"])
print("Classificação:", resultado_score["classificacao_iforest"])

print("\n===== TESTE EXPLICAÇÃO =====")

from services.explanation_service import ExplanationService

explanation_service = ExplanationService(
    service.metadata
)

evidencias = explanation_service.gerar_evidencias(
    features=features_completas,
    preco=120,
    quantidade=50,
    valor_total=6000
)

print("Evidência de preço:", evidencias["preco"])
print("Evidência de quantidade:", evidencias["quantidade"])
print("Evidência de consistência:", evidencias["consistencia"])


score_investigacao = (
    explanation_service.calcular_score_investigacao(
        evidencias
    )
)

print(
    "Score de investigação:",
    score_investigacao
)


resultado_explicacao = (
    explanation_service.gerar_resultado(
        evidencias=evidencias,
        score_investigacao=score_investigacao,
        classificacao_iforest=resultado_score[
            "classificacao_iforest"
        ]
    )
)

print("\n===== RESULTADO DA EXPLICAÇÃO =====")

print(
    "Evidência estatística:",
    resultado_explicacao["evidencia_estatistica"]
)

print(
    "Prioridade:",
    resultado_explicacao["prioridade_investigacao"]
)

print(
    "Score investigação:",
    resultado_explicacao["score_investigacao"]
)

print(
    "Isolation Forest:",
    resultado_explicacao["classificacao_iforest"]
)

print("\n===== TESTE ANALYSIS SERVICE =====")

from services.analysis_service import AnalysisService

analysis_service = AnalysisService(
    feature_service=service,
    scoring_service=scoring_service,
    explanation_service=explanation_service
)

resultado_final = analysis_service.analisar(
    descricao="CADEIRA SOBRE",
    unidade=None,
    preco=120,
    quantidade=50,
    valor_total=6000,
    fornecedor="00000000000100",
    orgao="00000000000100",
    data_compra="2025-12-31"
)

print("\n===== RESULTADO FINAL =====")

print(
    "Classificação Isolation Forest:",
    resultado_final["classificacao_iforest"]
)

print(
    "Percentil Isolation Forest:",
    resultado_final["percentil_iforest"]
)

print(
    "Evidência estatística:",
    resultado_final["evidencia_estatistica"]
)

print(
    "Score de investigação:",
    resultado_final["score_investigacao"]
)

print(
    "Prioridade:",
    resultado_final["prioridade_investigacao"]
)

print(
    "Evidências:",
    resultado_final["evidencias"]
)

from services.feature_service import FeatureService

service = FeatureService()

print("\n===== TESTE CONSISTÊNCIA =====")

print("\nCaso 1 — Total correto:")
print(
    service.calcular_features_consistencia(
        preco=120,
        quantidade=50,
        valor_total=6000
    )
)

print("\nCaso 2 — Total incorreto:")
print(
    service.calcular_features_consistencia(
        preco=120,
        quantidade=50,
        valor_total=9000
    )
)

print("\nCaso 3 — Total ausente:")
print(
    service.calcular_features_consistencia(
        preco=120,
        quantidade=50,
        valor_total=None
    )
)

resultado = service.calcular_feature_share_fornecedor(
    descricao="FILTRO CABINE",
    fornecedor="19175860000194",
    data_compra="2025-01-16 08:16:01"
)

print(resultado)

# =============================================================================
# TESTE DA FUNÇÃO TEMPORAL / ÓRGÃO
# =============================================================================

print("=" * 80)
print("TESTE — calcular_features_orgao_temporal")
print("=" * 80)

feature_service_teste = FeatureService()

resultado_teste = feature_service_teste.calcular_features_orgao_temporal(
    descricao="ABACATE",
    orgao="10391817000191",
    quantidade=10,
    data_compra="2025-01-09 12:21:12"
)

print("\nResultado:")

for chave, valor in resultado_teste.items():
    print(f"- {chave}: {valor}")

print("\n" + "=" * 80)
print("VALIDAÇÃO")
print("=" * 80)

features_esperadas = {
    "log_qty_vs_orgao_hist_v2",
    "orgao_qty_sem_referencia_v2",
    "log_registros_mesmo_dia",
    "log_contracts_same_minute"
}

assert set(resultado_teste.keys()) == features_esperadas

print("\n✅ As 4 features foram calculadas.")
print("✅ Nenhuma feature foi perdida.")
print("✅ FeatureService continua carregando.")
print("⚠️ Ainda não validamos os valores contra o notebook causal.")

print("\n" + "=" * 80)
print("FIM")
print("=" * 80)