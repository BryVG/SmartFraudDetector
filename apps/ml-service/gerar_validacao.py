from pathlib import Path

import pandas as pd

from services.feature_service import FeatureService
from services.scoring_service import ScoringService
from services.explanation_service import ExplanationService
from services.analysis_service import AnalysisService


# ============================================================
# 1. LOCALIZAR PLANILHA DE TESTE
# ============================================================

arquivos = list(Path(".").glob("validacao_api_10_registros.csv"))

if not arquivos:
    raise FileNotFoundError(
        "Não encontrei a planilha de validação. "
        "Coloque o arquivo .csv na pasta do ml-service."
    )

arquivo_entrada = arquivos[0]

print(f"Planilha encontrada: {arquivo_entrada}")


# ============================================================
# 2. CARREGAR PIPELINE
# ============================================================

print("Carregando modelo...")

feature_service = FeatureService()

scoring_service = ScoringService(feature_service)

explanation_service = ExplanationService(
    feature_service.metadata
)

analysis_service = AnalysisService(
    feature_service=feature_service,
    scoring_service=scoring_service,
    explanation_service=explanation_service
)


# ============================================================
# 3. CARREGAR PLANILHA
# ============================================================

df = pd.read_csv(
    arquivo_entrada,
    dtype={
        "numeroControlePNCP": str,
        "niFornecedor": str,
        "orgaoEntidade.cnpj": str
    }
)

print(f"Registros encontrados: {len(df)}")


# ============================================================
# 4. ANALISAR CADA REGISTRO
# ============================================================

resultados = []

for indice, row in df.iterrows():

    try:

        unidade = row["unidadeMedida"]

        if pd.isna(unidade):
            unidade = None
        else:
            unidade = str(unidade).strip()

        resultado = analysis_service.analisar(

            descricao=str(
                row["descricao_normalizada"]
            ),

            unidade=unidade,

            preco=float(
                row["valorUnitarioHomologado"]
            ),

            quantidade=float(
                row["quantidade"]
            ),

            valor_total=float(
                row["valorTotalHomologado"]
            ),

            fornecedor=str(
                row["niFornecedor"]
            ),

            orgao=str(
                row["orgaoEntidade.cnpj"]
            ),

            data_compra=str(
                row["dataPublicacaoPncp"]
            ),

            numeroControlePNCP=str(
                row["numeroControlePNCP"]
            )
        )

        resultados.append({

            "status_analise": "OK",

            "score_investigacao":
                resultado["score_investigacao"],

            "prioridade_investigacao":
                resultado["prioridade_investigacao"],

            "evidencia_isolation":
                resultado["evidencia_isolation"],

            "evidencia_preco":
                resultado["evidencia_preco"],

            "evidencia_quantidade":
                resultado["evidencia_quantidade"],

            "evidencia_inconsistencia":
                resultado[
                    "evidencia_inconsistencia_ajustada"
                ],

            "evidencia_estatistica":
                resultado["evidencia_estatistica"],

            "evidencia_estrutural":
                resultado["evidencia_estrutural"],

            "principais_evidencias":
                " | ".join(
                    resultado["principais_evidencias"]
                ),

            "explicacao_investigacao":
                resultado["explicacao_investigacao"]
        })

        print(
            f"[{indice + 1}/{len(df)}] "
            f"{row['descricao_normalizada']} "
            f"-> "
            f"{resultado['prioridade_investigacao']} "
            f"({resultado['score_investigacao']:.4f})"
        )

    except Exception as erro:

        print(
            f"[{indice + 1}/{len(df)}] "
            f"ERRO: {erro}"
        )

        resultados.append({

            "status_analise": f"ERRO: {erro}",

            "score_investigacao": None,
            "prioridade_investigacao": None,
            "evidencia_isolation": None,
            "evidencia_preco": None,
            "evidencia_quantidade": None,
            "evidencia_inconsistencia": None,
            "evidencia_estatistica": None,
            "evidencia_estrutural": None,
            "principais_evidencias": None,
            "explicacao_investigacao": None
        })


# ============================================================
# 5. JUNTAR RESULTADO À PLANILHA ORIGINAL
# ============================================================

df_resultados = pd.DataFrame(resultados)

df_saida = pd.concat(
    [
        df.reset_index(drop=True),
        df_resultados
    ],
    axis=1
)


# ============================================================
# 6. SALVAR
# ============================================================

arquivo_saida = (
    Path("validacao_teste_10_RESULTADO.xlsx")
)

df_saida.to_excel(
    arquivo_saida,
    index=False
)


print()
print("=" * 70)
print("ANÁLISE FINALIZADA")
print("=" * 70)
print(f"Entrada : {arquivo_entrada}")
print(f"Saída   : {arquivo_saida}")
print(f"Registros: {len(df_saida)}")
print("=" * 70)