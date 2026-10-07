import numpy as np

class ExplanationService:

    def __init__(self, metadata):
        self.metadata = metadata

    def gerar_resultado(
        self,
        features,
        preco,
        quantidade,
        valor_total,
        resultado_score
    ):
        """
        Gera a explicação textual do resultado.

        O score e a prioridade já foram calculados pelo ScoringService.
        Este serviço apenas transforma as evidências em mensagens
        compreensíveis para o usuário.
        """

        evidencias = []

        # ==============================================================
        # EVIDÊNCIA — CONSISTÊNCIA
        # ==============================================================

        log_diferenca_total = float(
            features.get(
                "log_diferenca_total_v2",
                0.0
            )
        )

        confiabilidade_unidade = float(
            resultado_score.get(
                "confiabilidade_unidade",
                1.0
            )
        )

        evidencia_consistencia = (
            1
            - np.exp(
                -log_diferenca_total / 0.25
            )
        )

        evidencia_consistencia_ajustada = (
            evidencia_consistencia
            * confiabilidade_unidade
        )

        if evidencia_consistencia_ajustada >= 0.80:

            evidencias.append(
                (
                    100,
                    "Inconsistência forte entre preço, quantidade "
                    "e valor total"
                )
            )

        elif evidencia_consistencia_ajustada >= 0.50:

            evidencias.append(
                (
                    90,
                    "Inconsistência relevante entre preço, quantidade "
                    "e valor total"
                )
            )

        elif evidencia_consistencia_ajustada >= 0.25:

            evidencias.append(
                (
                    80,
                    "Diferença relevante entre valor calculado "
                    "e valor informado"
                )
            )

        # ==============================================================
        # EVIDÊNCIA — QUANTIDADE
        # ==============================================================

        log_desvio_quantidade = float(
            features.get(
                "log_desvio_quantidade",
                0.0
            )
        )

        evidencia_quantidade = (
            1
            - np.exp(
                -log_desvio_quantidade / 3.0
            )
        )

        if evidencia_quantidade >= 0.70:

            evidencias.append(
                (
                    75,
                    "Quantidade muito acima do padrão histórico"
                )
            )

        elif evidencia_quantidade >= 0.50:

            evidencias.append(
                (
                    65,
                    "Quantidade significativamente diferente "
                    "do histórico"
                )
            )

        elif evidencia_quantidade >= 0.30:

            evidencias.append(
                (
                    55,
                    "Quantidade apresenta desvio relevante "
                    "do histórico"
                )
            )

        # ==============================================================
        # EVIDÊNCIA — PREÇO
        # ==============================================================

        log_desvio_preco = float(
            features.get(
                "log_desvio_preco",
                0.0
            )
        )

        evidencia_preco = (
            1
            - np.exp(
                -log_desvio_preco / 3.0
            )
        )

        if evidencia_preco >= 0.30:

            evidencias.append(
                (
                    70,
                    "Preço apresenta desvio muito elevado "
                    "do histórico"
                )
            )

        elif evidencia_preco >= 0.20:

            evidencias.append(
                (
                    60,
                    "Preço apresenta desvio elevado "
                    "do histórico"
                )
            )

        elif evidencia_preco >= 0.15:

            evidencias.append(
                (
                    50,
                    "Preço apresenta desvio relevante "
                    "do histórico"
                )
            )

        # ==============================================================
        # EVIDÊNCIA — CONCORRÊNCIA
        # ==============================================================

        log_desvio_concorrencia = float(
            features.get(
                "log_desvio_concorrencia_v2",
                0.0
            )
        )

        evidencia_concorrencia = (
            1
            - __import__("numpy").exp(
                -log_desvio_concorrencia
            )
        )

        if evidencia_concorrencia >= 0.70:

            evidencias.append(
                (
                    70,
                    "Preço apresenta comportamento muito atípico "
                    "frente aos concorrentes"
                )
            )

        elif evidencia_concorrencia >= 0.50:

            evidencias.append(
                (
                    60,
                    "Preço apresenta comportamento atípico "
                    "frente aos concorrentes"
                )
            )

        elif evidencia_concorrencia >= 0.30:

            evidencias.append(
                (
                    50,
                    "Preço apresenta diferença relevante "
                    "frente aos concorrentes"
                )
            )

        # ==============================================================
        # EVIDÊNCIA — CONTRATO
        # ==============================================================

        log_score_contrato = float(
            features.get(
                "log_score_contrato_orgao_v2",
                0.0
            )
        )

        if log_score_contrato >= 2.0:

            evidencias.append(
                (
                    65,
                    "Valor do contrato apresenta desvio muito elevado "
                    "no histórico do órgão"
                )
            )

        elif log_score_contrato >= 1.0:

            evidencias.append(
                (
                    55,
                    "Valor do contrato apresenta desvio relevante "
                    "no histórico do órgão"
                )
            )

        # ==============================================================
        # EVIDÊNCIA — FORNECEDOR
        # ==============================================================

        share_fornecedor = float(
            features.get(
                "share_hist_pf_v2",
                0.0
            )
            or 0.0
        )

        fornecedor_exclusivo = int(
            features.get(
                "produto_fornecedor_exclusivo_hist_v2",
                0
            )
            or 0
        )

        if share_fornecedor >= 0.80:

            evidencias.append(
                (
                    65,
                    "Fornecedor possui concentração histórica "
                    "muito elevada neste produto"
                )
            )

        elif share_fornecedor >= 0.50:

            evidencias.append(
                (
                    55,
                    "Fornecedor possui concentração histórica "
                    "elevada neste produto"
                )
            )

        if fornecedor_exclusivo == 1:

            evidencias.append(
                (
                    60,
                    "Fornecedor aparece como exclusivo no histórico "
                    "disponível deste produto"
                )
            )

        # ==============================================================
        # EVIDÊNCIA — ISOLATION FOREST
        # ==============================================================

        evidencia_isolation = float(
            resultado_score.get(
                "evidencia_isolation",
                0.0
            )
        )

        if evidencia_isolation >= 0.99:

            evidencias.append(
                (
                    100,
                    "Comportamento multivariado altamente atípico "
                    "segundo o modelo"
                )
            )

        elif evidencia_isolation >= 0.95:

            evidencias.append(
                (
                    90,
                    "Comportamento multivariado atípico "
                    "segundo o modelo"
                )
            )

        # ==============================================================
        # ORDENAR E LIMITAR ÀS 3 PRINCIPAIS
        # ==============================================================

        evidencias.sort(
            key=lambda item: item[0],
            reverse=True
        )

        principais_evidencias = [
            mensagem
            for _, mensagem in evidencias[:3]
        ]

        if principais_evidencias:

            explicacao_investigacao = (
                "; ".join(principais_evidencias)
                + "."
            )

        else:

            explicacao_investigacao = (
                "Não foram identificados sinais estatísticos ou "
                "estruturais relevantes para priorização."
            )

        return {
            "principais_evidencias": principais_evidencias,
            "explicacao_investigacao": explicacao_investigacao
        }