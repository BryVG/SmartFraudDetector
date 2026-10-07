import pandas as pd
import numpy as np

from services.feature_service import FeatureService


# ============================================================
# CONFIGURAÇÃO
# ============================================================

ARQUIVO = "validacao_api_10_registros.csv"

FEATURES = [
    "log_preco",
    "log_quantidade",
    "distancia_log",
    "distancia_log_qtd",
    "quantidade_historico",
    "log_desvio_preco",
    "log_desvio_quantidade",
    "log_diferenca_total_v2",
    "total_sem_referencia_v2",
    "share_hist_pf_v2",
    "inverso_concentracao_hist_v2",
    "produto_fornecedor_exclusivo_hist_v2",
    "share_sem_referencia",
    "concentracao_sem_referencia",
    "exclusivo_sem_referencia",
    "log_qty_vs_orgao_hist_v2",
    "orgao_qty_sem_referencia_v2",
    "log_desvio_concorrencia_v2",
    "concorrencia_sem_referencia",
    "log_registros_mesmo_dia",
    "log_contracts_same_minute",
    "log_score_contrato_orgao_v2",
    "log_contratos_orgao_hist",
    "contrato_sem_referencia"
]


# ============================================================
# LEITURA
# ============================================================

df = pd.read_csv(
    ARQUIVO,
    index_col=0,
    encoding="utf-8-sig"
)

print("=" * 80)
print("VALIDAÇÃO API x NOTEBOOK - 10 REGISTROS")
print("=" * 80)

print(f"Registros carregados: {len(df)}")
print()


# ============================================================
# SERVIÇO
# ============================================================

service = FeatureService()


# ============================================================
# COMPARAÇÃO
# ============================================================

total_features = 0
total_iguais = 0
total_diferentes = 0


for _, row in df.iterrows():

    print("=" * 80)
    print(f"REGISTRO: {row.name}")
    print("=" * 80)

    print(f"Produto:      {row['descricao_normalizada']}")
    print(f"Preço:        {row['valorUnitarioHomologado']}")
    print(f"Quantidade:   {row['quantidade']}")
    print(f"Fornecedor:   {row['niFornecedor']}")
    print(f"Órgão:        {row['orgaoEntidade.cnpj']}")
    print(f"Data:         {row['dataPublicacaoPncp']}")
    print(f"Controle:     {row['numeroControlePNCP']}")
    print()

    # --------------------------------------------------------
    # Unidade
    # --------------------------------------------------------

    unidade = row["unidadeMedida"]

    if pd.isna(unidade):
        unidade = None

    # --------------------------------------------------------
    # CHAMADA DA API / FEATURE SERVICE
    # --------------------------------------------------------

    try:

        features_api = service.calcular_features_completas(
            descricao=row["descricao_normalizada"],
            unidade=unidade,
            preco=float(row["valorUnitarioHomologado"]),
            quantidade=float(row["quantidade"]),
            valor_total=float(row["valorTotalHomologado"]),
            fornecedor=str(row["niFornecedor"]),
            orgao=str(row["orgaoEntidade.cnpj"]),
            data_compra=row["dataPublicacaoPncp"],
            numeroControlePNCP=str(row["numeroControlePNCP"])
        )
    except Exception as e:

        print("❌ ERRO AO CALCULAR FEATURES:")
        print(type(e).__name__)
        print(e)
        print()

        total_diferentes += len(FEATURES)

        continue


    # --------------------------------------------------------
    # COMPARAÇÃO
    # --------------------------------------------------------

    iguais = 0
    diferentes = 0

    print("COMPARAÇÃO:")
    print("-" * 80)

    for feature in FEATURES:

        valor_notebook = row[feature]
        valor_api = features_api.get(feature)

        total_features += 1

        # NaN == NaN
        if pd.isna(valor_notebook) and pd.isna(valor_api):
            igual = True

        else:

            try:
                igual = np.isclose(
                    float(valor_notebook),
                    float(valor_api),
                    rtol=1e-9,
                    atol=1e-9,
                    equal_nan=True
                )

            except (ValueError, TypeError):
                igual = str(valor_notebook) == str(valor_api)

        if igual:

            iguais += 1
            total_iguais += 1

        else:

            diferentes += 1
            total_diferentes += 1

            print(
                f"❌ {feature}\n"
                f"   Notebook: {valor_notebook}\n"
                f"   API:      {valor_api}\n"
            )


    # --------------------------------------------------------
    # RESULTADO DO REGISTRO
    # --------------------------------------------------------

    if total_features == 0:

        print("❌ NENHUMA FEATURE FOI COMPARADA")
        print("A validação não foi executada.")

    elif total_diferentes == 0:

        print("🎯 VALIDAÇÃO 100% APROVADA")
        print("A API reproduziu todas as 24 features nos 10 registros.")

    else:

        print("⚠️ EXISTEM DIVERGÊNCIAS")
        print("Veja acima quais features não reproduziram o notebook.")


# ============================================================
# RESULTADO FINAL
# ============================================================

print("=" * 80)
print("RESULTADO FINAL")
print("=" * 80)

print(f"Features comparadas : {total_features}")
print(f"Features iguais     : {total_iguais}")
print(f"Features diferentes : {total_diferentes}")

if total_features > 0:

    percentual = (
        total_iguais / total_features
    ) * 100

    print(f"Convergência        : {percentual:.2f}%")

print()

if total_diferentes == 0:

    print("🎯 VALIDAÇÃO 100% APROVADA")
    print("A API reproduziu todas as 24 features nos 10 registros.")

else:

    print("⚠️ EXISTEM DIVERGÊNCIAS")
    print("Veja acima quais features não reproduziram o notebook.")